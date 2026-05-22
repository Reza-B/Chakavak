import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GuestLoginDto {
  @IsString()
  @MaxLength(100)
  deviceId!: string;

  @IsOptional()
  @IsString()
  nickname?: string;
}
