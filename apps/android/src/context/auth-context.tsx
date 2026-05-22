import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import * as authService from '@/services/auth-service';

type AuthStep = 'phone' | 'otp' | 'done';

type AuthContextType = {
  isLoggedIn: boolean;
  phoneNumber: string;
  authStep: AuthStep;
  isLoading: boolean;
  accessToken: string;
  requestOtp: (phone: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<boolean>;
  loginAsGuest: (nickname?: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authStep, setAuthStep] = useState<AuthStep>('phone');
  const [challengeId, setChallengeId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      isLoggedIn: authStep === 'done' && !!accessToken,
      phoneNumber,
      authStep,
      accessToken,
      isLoading,
      requestOtp: async (phone: string) => {
        setIsLoading(true);
        try {
          const challenge = await authService.requestOtp(phone);
          setPhoneNumber(phone);
          setChallengeId(challenge.challengeId);
          setAuthStep('otp');
        } finally {
          setIsLoading(false);
        }
      },
      verifyOtp: async (code: string) => {
        setIsLoading(true);
        try {
          const session = await authService.verifyOtp(challengeId, code);
          setAccessToken(session.accessToken);
          setAuthStep('done');
          return true;
        } catch {
          return false;
        } finally {
          setIsLoading(false);
        }
      },
      loginAsGuest: async (nickname?: string) => {
        setIsLoading(true);
        try {
          const deviceId = `device-${Date.now()}`;
          const session = await authService.guestLogin(deviceId, nickname);
          setAccessToken(session.accessToken);
          setPhoneNumber('');
          setAuthStep('done');
          return true;
        } catch {
          return false;
        } finally {
          setIsLoading(false);
        }
      },
      logout: () => {
        setPhoneNumber('');
        setChallengeId('');
        setAccessToken('');
        setAuthStep('phone');
      },
    }),
    [accessToken, authStep, challengeId, isLoading, phoneNumber]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
