import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomHandRaiseEntity } from './entities/room-hand-raise.entity';
import { RoomMemberEntity } from './entities/room-member.entity';
import { RoomEntity } from './entities/room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, RoomMemberEntity, RoomHandRaiseEntity])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
