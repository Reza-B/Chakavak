import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function RoomsScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Rooms</ThemedText>
        <ThemedText themeColor="textSecondary">صفحه چهارم برای نوار ناوبری: مدیریت اتاق‌ها و صف درخواست دست.</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: Spacing.four, gap: Spacing.two } });
