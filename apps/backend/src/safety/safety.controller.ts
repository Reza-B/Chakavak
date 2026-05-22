import { Body, Controller, Get, Post } from '@nestjs/common';

type Report = { id: string; roomId: string; reporterId: string; targetUserId?: string; reason: string; at: string };

@Controller('safety')
export class SafetyController {
  private readonly reports: Report[] = [];
  private readonly bannedUsers = new Set<string>();
  private readonly bannedIps = new Set<string>();

  @Post('report')
  report(@Body('roomId') roomId: string, @Body('reporterId') reporterId: string, @Body('reason') reason: string, @Body('targetUserId') targetUserId?: string) {
    const report = { id: `rep_${Date.now()}`, roomId, reporterId, reason, targetUserId, at: new Date().toISOString() };
    this.reports.push(report);
    return report;
  }

  @Get('reports')
  listReports() { return this.reports.slice(-500); }

  @Post('ban/user')
  banUser(@Body('userId') userId: string) { this.bannedUsers.add(userId); return { ok: true }; }

  @Post('ban/ip')
  banIp(@Body('ip') ip: string) { this.bannedIps.add(ip); return { ok: true }; }

  @Get('bans')
  listBans() { return { users: [...this.bannedUsers], ips: [...this.bannedIps] }; }
}
