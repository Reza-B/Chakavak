import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

const tabItems = [
  { name: 'home', href: '/', label: 'Home' },
  { name: 'explore', href: '/explore', label: 'Explore' },
  { name: 'rooms', href: '/rooms', label: 'Rooms' },
  { name: 'profile', href: '/profile', label: 'Profile' },
];

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <ThemedView type="backgroundElement" style={styles.list}>
          {tabItems.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <Pressable style={styles.button}>
                {({ pressed }) => (
                  <ThemedText type="smallBold" style={{ opacity: pressed ? 0.6 : 1 }}>
                    {tab.label}
                  </ThemedText>
                )}
              </Pressable>
            </TabTrigger>
          ))}
        </ThemedView>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    bottom: Spacing.three,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.two,
  },
  button: { paddingVertical: Spacing.two, paddingHorizontal: Spacing.three },
});
