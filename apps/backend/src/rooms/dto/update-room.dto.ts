import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;
}
