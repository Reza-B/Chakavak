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
  const { login } = useAuth();
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">چکاوک</ThemedText>
        <ThemedText themeColor="textSecondary">ورود با شماره موبایل</ThemedText>

        <TextInput
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          placeholder="09xxxxxxxxx"
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]}
        />

        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => login(phone.trim())}
          disabled={phone.trim().length < 10}>
          <ThemedText type="smallBold" style={{ color: '#fff' }}>دریافت کد و ورود</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: Spacing.four, gap: Spacing.three },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: Spacing.three, paddingVertical: 14 },
  button: { borderRadius: 16, alignItems: 'center', paddingVertical: 14 },
});
