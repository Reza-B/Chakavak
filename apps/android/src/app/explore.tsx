import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ExploreScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="subtitle">اکسپلور</ThemedText>
        {['Speed Chitchat', 'اتاق سکوت و تمرکز', 'اتاق بازی مافیا'].map((item) => (
          <ThemedView key={item} style={[styles.item, { borderColor: theme.border }]}>
            <ThemedText type="smallBold">{item}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, gap: Spacing.two },
  item: { borderRadius: 14, borderWidth: 1, padding: Spacing.three },
});
