import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { RaiseHandDto } from './dto/hand-raise.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomHandRaiseEntity } from './entities/room-hand-raise.entity';
import { RoomMemberEntity } from './entities/room-member.entity';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity) private readonly roomsRepo: Repository<RoomEntity>,
    @InjectRepository(RoomMemberEntity) private readonly membersRepo: Repository<RoomMemberEntity>,
    @InjectRepository(RoomHandRaiseEntity) private readonly raisesRepo: Repository<RoomHandRaiseEntity>
  ) {}

  async create(dto: CreateRoomDto) {
    const room = this.roomsRepo.create({ title: dto.title, topic: dto.topic ?? 'general' });
    const saved = await this.roomsRepo.save(room);
    await this.membersRepo.save(this.membersRepo.create({ roomId: saved.id, userId: dto.hostUserId, role: 'host' }));
    return saved;
  }

  findAll() { return this.roomsRepo.find({ order: { createdAt: 'DESC' } }); }

  async findOne(id: string) {
    const room = await this.roomsRepo.findOne({ where: { id } });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async update(id: string, dto: UpdateRoomDto) {
    const room = await this.findOne(id);
    Object.assign(room, dto);
    return this.roomsRepo.save(room);
  }

  async close(id: string) {
    const room = await this.findOne(id);
    room.isOpen = false;
    return this.roomsRepo.save(room);
  }

  async join(roomId: string, userId: string) {
    const room = await this.findOne(roomId);
    const existing = await this.membersRepo.findOne({ where: { roomId: room.id, userId } });
    if (existing) return existing;
    return this.membersRepo.save(this.membersRepo.create({ roomId: room.id, userId, role: 'listener' }));
  }

  async leave(roomId: string, userId: string) {
    await this.membersRepo.delete({ roomId, userId });
    return { ok: true };
  }

  async raiseHand(roomId: string, dto: RaiseHandDto) {
    await this.findOne(roomId);
    return this.raisesRepo.save(this.raisesRepo.create({ roomId, userId: dto.userId, status: 'pending' }));
  }

  async listRaiseHands(roomId: string) {
    return this.raisesRepo.find({ where: { roomId, status: 'pending' }, order: { createdAt: 'ASC' } });
  }

  async approveRaise(roomId: string, raiseId: string) {
    const raise = await this.raisesRepo.findOne({ where: { id: raiseId, roomId } });
    if (!raise) throw new NotFoundException('Raise request not found');
    raise.status = 'approved';
    await this.raisesRepo.save(raise);
    await this.membersRepo.update({ roomId, userId: raise.userId }, { role: 'speaker' });
    return raise;
  }

  async rejectRaise(roomId: string, raiseId: string) {
    const raise = await this.raisesRepo.findOne({ where: { id: raiseId, roomId } });
    if (!raise) throw new NotFoundException('Raise request not found');
    raise.status = 'rejected';
    return this.raisesRepo.save(raise);
  }

  async muteAll(roomId: string) {
    await this.findOne(roomId);
    await this.membersRepo.createQueryBuilder().update(RoomMemberEntity).set({ isMuted: true }).where('roomId = :roomId', { roomId }).andWhere("role != 'host'").execute();
    await this.roomsRepo.update({ id: roomId }, { isMutedAll: true });
    return { ok: true };
  }
}
