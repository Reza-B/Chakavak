import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  phoneNumber: string;
  login: (phone: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const value = useMemo(
    () => ({
      isLoggedIn: !!phoneNumber,
      phoneNumber,
      login: (phone: string) => setPhoneNumber(phone),
      logout: () => setPhoneNumber(''),
    }),
    [phoneNumber]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
