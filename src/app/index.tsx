import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const rooms = ['مافیا شبانه', 'مشاعره', 'گپ آخرشب', 'Lo-Fi Focus'];

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">Show Your Moments Globally</ThemedText>
        <ThemedText themeColor="textSecondary">اتاق‌های ترند چکاوک</ThemedText>

        <View style={styles.row}>
          {rooms.map((item) => (
            <ThemedView key={item} style={[styles.chip, { borderColor: theme.border }]}>
              <ThemedText type="smallBold">{item}</ThemedText>
            </ThemedView>
          ))}
        </View>

        <ThemedView style={[styles.card, { borderColor: theme.border }]}>
          <ThemedText type="subtitle">اتاق زنده: درد‌دل و گپ شبانه</ThemedText>
          <ThemedText themeColor="textSecondary">۳۲ شنونده · ۵ سخنران · افکت واکنش فعال</ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, gap: Spacing.three },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  chip: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1 },
  card: { borderRadius: 20, borderWidth: 1, padding: Spacing.three, gap: Spacing.one, marginTop: Spacing.two },
});
