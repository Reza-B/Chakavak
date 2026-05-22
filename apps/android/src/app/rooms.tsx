import { Link } from 'expo-router';
import { memo, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { rooms, type Room } from '@/data/rooms';
import { useTheme } from '@/hooks/use-theme';

const RoomCard = memo(function RoomCard({ room, borderColor }: { room: Room; borderColor: string }) {
  return (
    <Link href={`/room/${room.id}`} asChild>
      <Pressable>
        <ThemedView style={[styles.card, { borderColor }]}>
          <ThemedText type="smallBold">{room.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{room.topic}</ThemedText>
          <ThemedText themeColor="textSecondary">{room.listeners} شنونده · {room.speakers} سخنران</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
});

export default function RoomsScreen() {
  const theme = useTheme();
  const header = useMemo(() => <ThemedText type="subtitle">اتاق‌ها</ThemedText>, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        contentContainerStyle={styles.container}
        initialNumToRender={6}
        windowSize={7}
        removeClippedSubviews
        renderItem={({ item }) => <RoomCard room={item} borderColor={theme.border} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, gap: Spacing.two },
  card: { borderWidth: 1, borderRadius: 14, padding: Spacing.three, gap: Spacing.one },
});
