import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccountType } from './account-type.entity';
import { GetAccountDTO, UUID } from '@pid/shared';

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

  toDTO(): GetAccountDTO {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      issuer: this.issuer,
      number: this.number,
      interestRate: this.interestRate,
      withdrawalLimit: this.withdrawalLimit,
      createdAt: this.createdAt,
      accountTypeName: this.accountType.name,
    };
  }
}
