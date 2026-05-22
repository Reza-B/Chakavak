import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('engagement')
export class EngagementController {
  private readonly reactions = new Map<string, Array<{ userId: string; reaction: string; at: string }>>();
  private readonly chats = new Map<string, Array<{ userId: string; text: string; at: string }>>();
  private readonly chitchatQueue: string[] = [];

  @Post('rooms/:roomId/reactions')
  addReaction(@Param('roomId') roomId: string, @Body('userId') userId: string, @Body('reaction') reaction: string) {
    const list = this.reactions.get(roomId) ?? [];
    const item = { userId, reaction, at: new Date().toISOString() };
    list.push(item);
    this.reactions.set(roomId, list.slice(-100));
    return { ok: true, item };
  }

  @Get('rooms/:roomId/reactions')
  getReactions(@Param('roomId') roomId: string) {
    return this.reactions.get(roomId) ?? [];
  }

  @Post('rooms/:roomId/chat')
  addChat(@Param('roomId') roomId: string, @Body('userId') userId: string, @Body('text') text: string) {
    const list = this.chats.get(roomId) ?? [];
    const item = { userId, text, at: new Date().toISOString() };
    list.push(item);
    this.chats.set(roomId, list.slice(-300));
    return { ok: true, item };
  }

  @Get('rooms/:roomId/chat')
  getChat(@Param('roomId') roomId: string) {
    return this.chats.get(roomId) ?? [];
  }

  @Post('speed-chitchat/enqueue')
  enqueue(@Body('userId') userId: string) {
    if (!this.chitchatQueue.includes(userId)) this.chitchatQueue.push(userId);
    if (this.chitchatQueue.length >= 2) {
      const a = this.chitchatQueue.shift()!;
      const b = this.chitchatQueue.shift()!;
      return { matched: true, roomId: `chitchat_${Date.now()}`, users: [a, b], durationSec: 180 };
    }
    return { matched: false };
  }
}
