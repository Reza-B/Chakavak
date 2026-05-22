import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2B1A2B',
    background: '#FFF5FA',
    backgroundElement: '#FFE8F2',
    backgroundSelected: '#FFD5E7',
    textSecondary: '#875D77',
    primary: '#F45A9B',
    primaryMuted: '#FCE1EE',
    card: '#FFFFFF',
    border: '#F3C4DA',
  },
  dark: {
    text: '#FFEAF5',
    background: '#140A12',
    backgroundElement: '#2A1523',
    backgroundSelected: '#3A1C30',
    textSecondary: '#C88AAA',
    primary: '#FF6FAE',
    primaryMuted: '#51243C',
    card: '#22101D',
    border: '#5E2E48',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: { sans: 'var(--font-display)', serif: 'var(--font-serif)', rounded: 'var(--font-rounded)', mono: 'var(--font-mono)' },
});

export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64 } as const;
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 900;
