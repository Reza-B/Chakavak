import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/hooks/use-theme';

type AuthMode = 'login' | 'signup';

export function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { requestOtp, verifyOtp, loginAsGuest, authStep, phoneNumber, isLoading } = useAuth();
  const theme = useTheme();

  const isPhoneStep = authStep === 'phone';
  const title = useMemo(() => (mode === 'login' ? 'ورود حرفه‌ای به چکاوک' : 'ثبت‌نام سریع در چکاوک'), [mode]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.screen}>
        <View style={styles.hero}>
          <ThemedText type="title" style={styles.brand}>Chakavak</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.tagline}>Live voice rooms, Persian-first.</ThemedText>
        </View>

        <ThemedView style={[styles.card, { borderColor: theme.border, backgroundColor: theme.card }]}> 
          <View style={[styles.modeWrap, { backgroundColor: theme.primaryMuted }]}> 
            <Pressable
              style={[styles.modeBtn, mode === 'login' && { backgroundColor: theme.primary }]}
              onPress={() => setMode('login')}>
              <ThemedText type="smallBold" style={mode === 'login' ? styles.modeTextActive : undefined}>ورود</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.modeBtn, mode === 'signup' && { backgroundColor: theme.primary }]}
              onPress={() => setMode('signup')}>
              <ThemedText type="smallBold" style={mode === 'signup' ? styles.modeTextActive : undefined}>ثبت‌نام</ThemedText>
            </Pressable>
          </View>

          <ThemedText type="subtitle" style={styles.formTitle}>{title}</ThemedText>

          {mode === 'signup' && isPhoneStep && (
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="نام نمایشی"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.backgroundElement }]}
            />
          )}

          {isPhoneStep ? (
            <>
              <TextInput
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholder="شماره موبایل (مثال: +98912xxxxxxx)"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.backgroundElement }]}
              />
              <Pressable
                style={[styles.cta, { backgroundColor: theme.primary }]}
                onPress={async () => {
                  setError('');
                  try {
                    await requestOtp(phone.trim());
                  } catch {
                    setError('ارسال کد ناموفق بود. لطفاً دوباره تلاش کن.');
                  }
                }}
                disabled={phone.trim().length < 10 || isLoading}>
                <ThemedText type="smallBold" style={styles.ctaText}>{isLoading ? 'در حال ارسال...' : 'دریافت کد تایید'}</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.secondaryCta, { borderColor: theme.border }]}
                onPress={async () => {
                  setError('');
                  const ok = await loginAsGuest(nickname.trim() || 'Guest');
                  if (!ok) setError('ورود مهمان در حال حاضر ممکن نیست.');
                }}
                disabled={isLoading}>
                <ThemedText type="smallBold">ورود مهمان</ThemedText>
              </Pressable>
            </>
          ) : (
            <>
              <ThemedText themeColor="textSecondary">کد تایید برای {phoneNumber} ارسال شد.</ThemedText>
              <TextInput
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                placeholder="کد ۵ رقمی"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.backgroundElement }]}
              />
              <Pressable
                style={[styles.cta, { backgroundColor: theme.primary }]}
                onPress={async () => {
                  const ok = await verifyOtp(otp.trim());
                  if (!ok) setError('کد وارد شده صحیح نیست.');
                  else setError('');
                }}
                disabled={isLoading}>
                <ThemedText type="smallBold" style={styles.ctaText}>{isLoading ? 'در حال بررسی...' : 'تایید و ورود'}</ThemedText>
              </Pressable>
            </>
          )}

          {!!error && <ThemedText style={styles.error}>{error}</ThemedText>}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: Spacing.four, gap: Spacing.three },
  hero: { gap: Spacing.one, marginBottom: Spacing.two },
  brand: { fontSize: 44, lineHeight: 48 },
  tagline: { fontSize: 15 },
  card: { borderWidth: 1, borderRadius: 26, padding: Spacing.three, gap: Spacing.two, shadowOpacity: 0.08, shadowRadius: 18, elevation: 4 },
  modeWrap: { borderRadius: 14, padding: 4, flexDirection: 'row', gap: 4 },
  modeBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  modeTextActive: { color: '#fff' },
  formTitle: { fontSize: 24, lineHeight: 30 },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: Spacing.three, paddingVertical: 14, fontSize: 15 },
  cta: { borderRadius: 14, alignItems: 'center', paddingVertical: 14 },
  ctaText: { color: '#fff' },
  secondaryCta: { borderWidth: 1, borderRadius: 14, alignItems: 'center', paddingVertical: 12 },
  error: { color: '#ef4444' },
});
