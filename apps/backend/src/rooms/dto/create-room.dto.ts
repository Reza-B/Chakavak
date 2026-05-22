import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MaxLength(120)
  title!: string;

  @IsOptional()
  @IsString()
  topic?: string;

  @IsString()
  hostUserId!: string;
}
