import { useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { type Room } from '@/data/rooms';
import { useTheme } from '@/hooks/use-theme';
import { approveSpeaker, getRoomById, getStageQueue, requestToSpeak, sendReaction } from '@/services/rooms-service';

const reactions = ['👏', '😂', '🔥', '🎉'];

const QueueRow = memo(function QueueRow({
  user,
  canApprove,
  borderColor,
  onApprove,
}: {
  user: string;
  canApprove: boolean;
  borderColor: string;
  onApprove: (username: string) => void;
}) {
  return (
    <ThemedView style={[styles.queueItem, { borderColor }]}>
      <ThemedText>{user}</ThemedText>
      {canApprove && (
        <Pressable onPress={() => onApprove(user)}>
          <ThemedText type="linkPrimary">قبول</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
});

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const [room, setRoom] = useState<Room | null>(null);
  const [queue, setQueue] = useState<string[]>([]);
  const [lastReaction, setLastReaction] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>(['خوش اومدی به بک‌چنل 👋']);

  useEffect(() => {
    let active = true;
    async function bootstrap() {
      if (!id) return;
      const [roomData, queueData] = await Promise.all([getRoomById(id), getStageQueue(id)]);
      if (!active) return;
      setRoom(roomData);
      setQueue(queueData);
    }
    bootstrap();
    return () => {
      active = false;
    };
  }, [id]);

  const isHost = room?.role === 'host';

  const handleRaiseHand = useCallback(async () => {
    setQueue(await requestToSpeak('you_now'));
  }, []);

  const handleApprove = useCallback(async (username: string) => {
    setQueue(await approveSpeaker(username));
  }, []);

  const handleReaction = useCallback(
    async (reaction: string) => {
      if (!room) return;
      const res = await sendReaction(room.id, reaction);
      if (res.ok) setLastReaction(res.reaction);
    },
    [room]
  );

  const recentMessages = useMemo(() => messages.slice(-3), [messages]);

  if (!room) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <ThemedView style={styles.container}>
          <ThemedText>در حال بارگذاری اتاق...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">{room.title}</ThemedText>
        <ThemedText themeColor="textSecondary">نقش شما: {room.role}</ThemedText>

        <View style={styles.row}>
          <Pressable style={[styles.action, { backgroundColor: theme.primary }]} onPress={handleRaiseHand}>
            <ThemedText type="smallBold" style={{ color: '#fff' }}>Raise Hand</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.action, { backgroundColor: theme.primaryMuted }]}
            onPress={() => Alert.alert('Mute All', 'در نسخه بعدی به WebRTC متصل می‌شود.')}>
            <ThemedText type="smallBold">Mute All</ThemedText>
          </Pressable>
        </View>

        <ThemedText type="smallBold">Sound Reactions</ThemedText>
        <View style={styles.row}>
          {reactions.map((r) => (
            <Pressable key={r} style={[styles.reaction, { borderColor: theme.border }]} onPress={() => handleReaction(r)}>
              <ThemedText>{r}</ThemedText>
            </Pressable>
          ))}
        </View>
        {!!lastReaction && <ThemedText themeColor="textSecondary">آخرین واکنش: {lastReaction}</ThemedText>}

        <ThemedText type="smallBold">صف درخواست استیج</ThemedText>
        <FlatList
          data={queue}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          removeClippedSubviews
          renderItem={({ item }) => (
            <QueueRow user={item} canApprove={isHost} borderColor={theme.border} onApprove={handleApprove} />
          )}
        />

        <ThemedText type="smallBold">Backchannel</ThemedText>
        {recentMessages.map((m, idx) => (
          <ThemedText key={`${m}_${idx}`} themeColor="textSecondary">• {m}</ThemedText>
        ))}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="پیام متنی..."
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]}
        />
        <Pressable
          style={[styles.action, { backgroundColor: theme.primaryMuted }]}
          onPress={() => {
            if (!message.trim()) return;
            setMessages((prev) => [...prev, message.trim()]);
            setMessage('');
          }}>
          <ThemedText type="smallBold">ارسال پیام</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.four, gap: Spacing.two },
  row: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' },
  action: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  queueItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: Spacing.two,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  reaction: { borderWidth: 1, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
});
