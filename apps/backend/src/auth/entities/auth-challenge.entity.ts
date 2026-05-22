import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_challenges')
export class AuthChallengeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ length: 8 })
  code!: string;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ default: false })
  used!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
