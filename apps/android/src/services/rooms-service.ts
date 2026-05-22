import { rooms, stageQueue } from '@/data/rooms';

let localQueue = [...stageQueue];

export async function getRoomById(id: string) {
  await wait(150);
  return rooms.find((r) => r.id === id) ?? rooms[0];
}

export async function sendReaction(_: string, reaction: string) {
  await wait(100);
  return { ok: true, reaction };
}

export async function getStageQueue(_: string) {
  await wait(100);
  return [...localQueue];
}

export async function requestToSpeak(username: string) {
  await wait(120);
  if (!localQueue.includes(username)) localQueue = [...localQueue, username];
  return [...localQueue];
}

export async function approveSpeaker(username: string) {
  await wait(120);
  localQueue = localQueue.filter((u) => u !== username);
  return [...localQueue];
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
