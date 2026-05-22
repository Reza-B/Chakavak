export type RoomRole = 'host' | 'speaker' | 'listener';

export type Room = {
  id: string;
  title: string;
  topic: string;
  listeners: number;
  speakers: number;
  reactionEnabled: boolean;
  role: RoomRole;
};

export const rooms: Room[] = [
  { id: 'mafia', title: 'اتاق بازی مافیا', topic: 'بازی گروهی', listeners: 120, speakers: 9, reactionEnabled: true, role: 'host' },
  { id: 'night-talk', title: 'درد دل آخر شب', topic: 'گفتگو آزاد', listeners: 42, speakers: 5, reactionEnabled: true, role: 'speaker' },
  { id: 'focus', title: 'اتاق سکوت و تمرکز', topic: 'Lo-Fi', listeners: 210, speakers: 0, reactionEnabled: false, role: 'listener' },
];

export const stageQueue = ['samira_92', 'amir.live', 'poet_fox'];
