import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { RoomHandRaiseEntity } from './room-hand-raise.entity';

export type RoomRole = 'host' | 'speaker' | 'listener';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 120 })
  title!: string;

  @Column({ default: 'general' })
  topic!: string;

  @Column({ default: true })
  isOpen!: boolean;

  @Column({ default: false })
  isMutedAll!: boolean;

  @OneToMany(() => RoomHandRaiseEntity, (raise) => raise.room)
  handRaises!: RoomHandRaiseEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
