import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/hooks/use-theme';

export function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { requestOtp, verifyOtp, loginAsGuest, authStep, phoneNumber, isLoading } = useAuth();
  const theme = useTheme();

  const isPhoneStep = authStep === 'phone';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">چکاوک</ThemedText>
        <ThemedText themeColor="textSecondary">ورود با شماره موبایل</ThemedText>

        {isPhoneStep ? (
          <>
            <TextInput
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="+989xxxxxxxxx"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]}
            />
            <Pressable
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={async () => {
                setError('');
                try {
                  await requestOtp(phone.trim());
                } catch {
                  setError('ارسال کد ناموفق بود.');
                }
              }}
              disabled={phone.trim().length < 10 || isLoading}>
              <ThemedText type="smallBold" style={{ color: '#fff' }}>{isLoading ? 'در حال ارسال...' : 'ارسال کد تایید'}</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: theme.primaryMuted }]}
              onPress={async () => {
                setError('');
                const ok = await loginAsGuest('Guest');
                if (!ok) setError('ورود مهمان محدود/ناموفق بود.');
              }}
              disabled={isLoading}>
              <ThemedText type="smallBold">ورود مهمان</ThemedText>
            </Pressable>
          </>
        ) : (
          <>
            <ThemedText>کد تایید برای {phoneNumber} ارسال شد.</ThemedText>
            <TextInput
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              placeholder="کد 5 رقمی"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]}
            />
            {!!error && <ThemedText style={{ color: '#ef4444' }}>{error}</ThemedText>}
            <Pressable
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={async () => {
                const ok = await verifyOtp(otp.trim());
                if (!ok) setError('کد وارد شده صحیح نیست.');
                else setError('');
              }}
              disabled={isLoading}>
              <ThemedText type="smallBold" style={{ color: '#fff' }}>{isLoading ? 'در حال بررسی...' : 'ورود به چکاوک'}</ThemedText>
            </Pressable>
          </>
        )}

        {!!error && <ThemedText style={{ color: '#ef4444' }}>{error}</ThemedText>}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: Spacing.four, gap: Spacing.three },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: Spacing.three, paddingVertical: 14 },
  button: { borderRadius: 16, alignItems: 'center', paddingVertical: 14 },
});
