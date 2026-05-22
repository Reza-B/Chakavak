import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const { phoneNumber, logout } = useAuth();
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">پروفایل</ThemedText>
        <ThemedText>شماره: {phoneNumber}</ThemedText>
        <Pressable style={[styles.btn, { backgroundColor: theme.primaryMuted }]} onPress={logout}>
          <ThemedText type="smallBold">خروج</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: Spacing.four, gap: Spacing.three }, btn: { padding: 12, borderRadius: 12, alignItems: 'center' } });
