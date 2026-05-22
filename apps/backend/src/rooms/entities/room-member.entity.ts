import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoomEntity, RoomRole } from './room.entity';

@Entity('room_members')
export class RoomMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  roomId!: string;

  @Column()
  userId!: string;

  @Column({ type: 'varchar', default: 'listener' })
  role!: RoomRole;

  @Column({ default: false })
  isMuted!: boolean;

  @ManyToOne(() => RoomEntity, { onDelete: 'CASCADE' })
  room!: RoomEntity;
}
