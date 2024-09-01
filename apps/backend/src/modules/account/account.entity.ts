import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccountType } from './account-type.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

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
}
