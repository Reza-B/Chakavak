import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import * as authService from '@/services/auth-service';

type AuthStep = 'phone' | 'otp' | 'done';

type AuthContextType = {
  isLoggedIn: boolean;
  phoneNumber: string;
  authStep: AuthStep;
  isLoading: boolean;
  requestOtp: (phone: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  devOtp: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authStep, setAuthStep] = useState<AuthStep>('phone');
  const [challengeId, setChallengeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [devOtp] = useState('12345');

  const value = useMemo(
    () => ({
      isLoggedIn: authStep === 'done' && !!phoneNumber,
      phoneNumber,
      authStep,
      isLoading,
      requestOtp: async (phone: string) => {
        setIsLoading(true);
        const challenge = await authService.requestOtp(phone);
        setPhoneNumber(phone);
        setChallengeId(challenge.challengeId);
        setAuthStep('otp');
        setIsLoading(false);
      },
      verifyOtp: async (code: string) => {
        setIsLoading(true);
        try {
          await authService.verifyOtp(challengeId, code);
          setAuthStep('done');
          setIsLoading(false);
          return true;
        } catch {
          setIsLoading(false);
          return false;
        }
      },
      logout: () => {
        setPhoneNumber('');
        setChallengeId('');
        setAuthStep('phone');
      },
      devOtp,
    }),
    [authStep, challengeId, devOtp, isLoading, phoneNumber]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
