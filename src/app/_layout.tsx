import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { LoginScreen } from '@/components/login-screen';
import { WelcomeOnboarding } from '@/components/welcome-onboarding';
import { AuthProvider, useAuth } from '@/context/auth-context';

function RootContent() {
  const colorScheme = useColorScheme();
  const { isLoggedIn, hasSeenOnboarding, completeOnboarding } = useAuth();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {isLoggedIn ? <AppTabs /> : hasSeenOnboarding ? <LoginScreen /> : <WelcomeOnboarding onFinish={completeOnboarding} />}
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
