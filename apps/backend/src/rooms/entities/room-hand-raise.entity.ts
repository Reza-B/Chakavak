import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoomEntity } from './room.entity';

@Entity('room_hand_raises')
export class RoomHandRaiseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  roomId!: string;

  @Column()
  userId!: string;

  @Column({ type: 'varchar', default: 'pending' })
  status!: 'pending' | 'approved' | 'rejected';

  @ManyToOne(() => RoomEntity, (room) => room.handRaises, { onDelete: 'CASCADE' })
  room!: RoomEntity;

  @CreateDateColumn()
  createdAt!: Date;
}
