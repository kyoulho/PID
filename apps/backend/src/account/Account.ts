import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountType } from './AccountType';
import { UUID } from '@mid/shared';
import { User } from '../user/User';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 200 })
  issuer: string;

  @Column({ type: 'varchar', length: 200 })
  number: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  interestRate: number;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  withdrawalLimit: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => AccountType, {
    eager: true,
    nullable: false,
  })
  accountType: AccountType;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  user: User;
}
