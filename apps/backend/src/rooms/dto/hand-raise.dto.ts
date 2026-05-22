import { IsString } from 'class-validator';

export class RaiseHandDto {
  @IsString()
  userId!: string;
}

export class ModerateHandRaiseDto {
  @IsString()
  hostUserId!: string;
}
