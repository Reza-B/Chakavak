import { Body, Controller, Ip, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GuestLoginDto } from './dto/guest-login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.authService.requestOtp(dto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('guest-login')
  guestLogin(@Body() dto: GuestLoginDto, @Ip() ip: string) {
    return this.authService.guestLogin(dto, ip || '0.0.0.0');
  }
}
