import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthChallengeEntity } from './entities/auth-challenge.entity';
import { GuestSessionEntity } from './entities/guest-session.entity';
import { FarazSmsService } from './faraz-sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthChallengeEntity, GuestSessionEntity])],
  controllers: [AuthController],
  providers: [AuthService, FarazSmsService],
})
export class AuthModule {}
