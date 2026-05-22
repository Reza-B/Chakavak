import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type OnboardingScreenProps = {
  onDone: () => void;
};

const slides = [
  {
    title: 'به چکاوک خوش اومدی',
    subtitle: 'اتاق‌های صوتی زنده رو پیدا کن، وارد شو و با آدم‌های هم‌فکر صحبت کن.',
  },
  {
    title: 'پروفایل حرفه‌ای بساز',
    subtitle: 'با بیو جذاب و انتخاب علایق، سریع‌تر توسط افراد مناسب پیدا شو.',
  },
  {
    title: 'همین حالا شروع کن',
    subtitle: 'با یک لمس وارد اتاق‌ها شو، فالو کن و از گفتگوهای باکیفیت لذت ببر.',
  },
];

export function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  const isLast = activeIndex === slides.length - 1;
  const currentSlide = slides[activeIndex];

  const accentCardColor = theme.primaryMuted;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <View style={[styles.glow, { backgroundColor: theme.primary }]} />

        <ThemedView style={[styles.heroCard, { borderColor: theme.border, backgroundColor: accentCardColor }]}>
          <ThemedText type="subtitle" style={styles.stepText}>مرحله {activeIndex + 1} از {slides.length}</ThemedText>
          <ThemedText type="title" style={styles.title}>{currentSlide.title}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.subtitle}>{currentSlide.subtitle}</ThemedText>

          <View style={styles.dotsRow}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: index === activeIndex ? 26 : 8,
                    backgroundColor: index === activeIndex ? theme.primary : theme.border,
                  },
                ]}
              />
            ))}
          </View>
        </ThemedView>

        <View style={styles.footerActions}>
          {!isLast && (
            <Pressable style={[styles.secondaryButton, { borderColor: theme.border }]} onPress={onDone}>
              <ThemedText type="smallBold">رد کردن</ThemedText>
            </Pressable>
          )}

          <Pressable
            style={[styles.primaryButton, { backgroundColor: theme.primary }]}
            onPress={() => (isLast ? onDone() : setActiveIndex((prev) => prev + 1))}>
            <ThemedText type="smallBold" style={styles.primaryText}>
              {isLast ? 'ورود به برنامه' : 'ادامه'}
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  glow: {
    width: 220,
    height: 220,
    borderRadius: 120,
    opacity: 0.15,
    position: 'absolute',
    top: -50,
    left: -50,
  },
  heroCard: {
    marginTop: '24%',
    borderRadius: 28,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  stepText: {
    textAlign: 'right',
  },
  title: {
    textAlign: 'right',
    lineHeight: 42,
  },
  subtitle: {
    textAlign: 'right',
    lineHeight: 28,
  },
  dotsRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: Spacing.two,
  },
  dot: {
    height: 8,
    borderRadius: 20,
  },
  footerActions: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryButton: {
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 15,
  },
  primaryText: {
    color: '#fff',
  },
});
