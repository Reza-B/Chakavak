import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useState } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { LoginScreen } from '@/components/login-screen';
import { OnboardingScreen } from '@/components/onboarding-screen';
import { AuthProvider, useAuth } from '@/context/auth-context';

function RootContent() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(Platform.OS !== 'android');

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {!onboardingDone ? <OnboardingScreen onDone={() => setOnboardingDone(true)} /> : isLoggedIn ? <AppTabs /> : <LoginScreen />}
    </ThemeProvider>
  );
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <RootContent />
    </AuthProvider>
  );
}
