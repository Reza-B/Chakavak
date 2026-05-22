import { useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const { width: screenWidth } = Dimensions.get('window');

const slides = [
  {
    title: 'به چکاوک خوش اومدی',
    description: 'اتاق‌های صوتی زنده بساز، شنونده پیدا کن و لحظه‌هات رو جهانی کن.',
  },
  {
    title: 'اتاق‌های موضوعی',
    description: 'از گپ‌های دوستانه تا روم‌های تخصصی؛ هر موضوعی جامعه خودش رو داره.',
  },
  {
    title: 'تعامل واقعی',
    description: 'واکنش زنده، درخواست میکروفون و گفت‌وگوهای واقعی فقط با یک لمس.',
  },
];

type WelcomeOnboardingProps = {
  onFinish: () => void;
};

export function WelcomeOnboarding({ onFinish }: WelcomeOnboardingProps) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage >= slides.length - 1) {
      onFinish();
      return;
    }

    scrollRef.current?.scrollTo({ x: (currentPage + 1) * screenWidth, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.root}>
        <View style={styles.headerRow}>
          <ThemedText type="title">چکاوک</ThemedText>
          <Pressable onPress={onFinish}>
            <ThemedText themeColor="textSecondary">رد کردن</ThemedText>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}>
          {slides.map((slide) => (
            <View key={slide.title} style={[styles.slide, { width: screenWidth }]}> 
              <ThemedView style={[styles.card, { borderColor: theme.border, backgroundColor: theme.card }]}> 
                <ThemedText type="subtitle">{slide.title}</ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.description}>
                  {slide.description}
                </ThemedText>
              </ThemedView>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.dotsRow}>
            {slides.map((slide, index) => (
              <View
                key={slide.title}
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === currentPage ? theme.primary : theme.border,
                    width: index === currentPage ? 20 : 8,
                  },
                ]}
              />
            ))}
          </View>

          <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleNext}>
            <ThemedText type="smallBold" style={{ color: '#fff' }}>
              {currentPage === slides.length - 1 ? 'شروع کنیم' : 'بعدی'}
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingVertical: Spacing.three },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  slide: { paddingHorizontal: Spacing.four, justifyContent: 'center' },
  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.two,
    minHeight: 220,
    justifyContent: 'center',
  },
  description: { lineHeight: 24 },
  footer: { marginTop: 'auto', paddingHorizontal: Spacing.four, gap: Spacing.three },
  dotsRow: { flexDirection: 'row', gap: 8, alignSelf: 'center' },
  dot: { height: 8, borderRadius: 8 },
  button: { borderRadius: 16, alignItems: 'center', paddingVertical: 14, marginBottom: Spacing.two },
});
