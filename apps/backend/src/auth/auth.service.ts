import { BadRequestException, Injectable, TooManyRequestsException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, randomInt } from 'crypto';
import { MoreThan, Repository } from 'typeorm';

import { GuestLoginDto } from './dto/guest-login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthChallengeEntity } from './entities/auth-challenge.entity';
import { GuestSessionEntity } from './entities/guest-session.entity';
import { FarazSmsService } from './faraz-sms.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthChallengeEntity) private readonly challengesRepo: Repository<AuthChallengeEntity>,
    @InjectRepository(GuestSessionEntity) private readonly guestRepo: Repository<GuestSessionEntity>,
    private readonly sms: FarazSmsService
  ) {}

  async requestOtp(dto: RequestOtpDto) {
    const oneMinuteAgo = new Date(Date.now() - 60_000);
    const countRecent = await this.challengesRepo.count({ where: { phone: dto.phone, createdAt: MoreThan(oneMinuteAgo) } });
    if (countRecent >= 3) throw new TooManyRequestsException('OTP rate limit exceeded');

    const code = String(randomInt(10000, 99999));
    const challenge = this.challengesRepo.create({
      phone: dto.phone,
      code,
      expiresAt: new Date(Date.now() + 2 * 60_000),
    });
    const saved = await this.challengesRepo.save(challenge);
    await this.sms.sendOtp(dto.phone, code);
    return { challengeId: saved.id, expiresInSec: 120 };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const challenge = await this.challengesRepo.findOne({ where: { id: dto.challengeId } });
    if (!challenge || challenge.used) throw new BadRequestException('Invalid challenge');
    if (challenge.expiresAt.getTime() < Date.now()) throw new BadRequestException('Challenge expired');
    if (challenge.attempts >= 5) throw new TooManyRequestsException('Too many attempts');

    challenge.attempts += 1;
    if (challenge.code !== dto.code) {
      await this.challengesRepo.save(challenge);
      throw new BadRequestException('Invalid code');
    }

    challenge.used = true;
    await this.challengesRepo.save(challenge);

    return {
      accessToken: this.makeToken('user', challenge.phone),
      refreshToken: this.makeToken('refresh', challenge.phone),
      user: { id: `phone:${challenge.phone}`, phone: challenge.phone },
    };
  }

  async guestLogin(dto: GuestLoginDto, ip: string) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const byDeviceToday = await this.guestRepo.count({ where: { deviceId: dto.deviceId, createdAt: MoreThan(todayStart) } });
    const byIpToday = await this.guestRepo.count({ where: { ip, createdAt: MoreThan(todayStart) } });

    if (byDeviceToday >= 5 || byIpToday >= 20) {
      throw new TooManyRequestsException('Guest limit exceeded for today');
    }

    const session = await this.guestRepo.save(
      this.guestRepo.create({ deviceId: dto.deviceId, ip, expiresAt: new Date(Date.now() + 24 * 60 * 60_000) })
    );

    return {
      accessToken: this.makeToken('guest', session.id),
      refreshToken: this.makeToken('guest-refresh', session.id),
      user: { id: `guest:${session.id}`, nickname: dto.nickname ?? 'Guest' },
      expiresAt: session.expiresAt,
    };
  }

  private makeToken(kind: string, subject: string) {
    return `${kind}.${Buffer.from(subject).toString('base64url')}.${randomBytes(24).toString('hex')}`;
  }
}
