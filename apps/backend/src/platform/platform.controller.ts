import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('platform')
export class PlatformController {
  private readonly presence = new Set<string>();
  private readonly invites: Array<{ toUserId: string; roomId: string; at: string }> = [];
  private readonly analytics: Array<{ event: string; userId?: string; meta?: unknown; at: string }> = [];

  @Post('presence/online')
  online(@Body('userId') userId: string) { this.presence.add(userId); return { ok: true, online: this.presence.size }; }

  @Post('presence/offline')
  offline(@Body('userId') userId: string) { this.presence.delete(userId); return { ok: true, online: this.presence.size }; }

  @Get('presence')
  listPresence() { return { onlineCount: this.presence.size, users: [...this.presence] }; }

  @Post('push/invite')
  pushInvite(@Body('toUserId') toUserId: string, @Body('roomId') roomId: string) {
    this.invites.push({ toUserId, roomId, at: new Date().toISOString() });
    return { ok: true };
  }

  @Post('analytics/event')
  track(@Body('event') event: string, @Body('userId') userId?: string, @Body('meta') meta?: unknown) {
    this.analytics.push({ event, userId, meta, at: new Date().toISOString() });
    return { ok: true };
  }

  @Get('analytics/events')
  events() { return this.analytics.slice(-1000); }
}
