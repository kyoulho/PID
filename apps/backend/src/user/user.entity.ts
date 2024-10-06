import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Email, PhoneNumber, UUID } from '@mid/shared';
import { Account } from '../account/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 11 })
  email: Email;

  @Column({ type: 'varchar', length: 60 })
  encodedPassword: string;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'varchar', length: 11 })
  phoneNumber: PhoneNumber;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Account, (account) => account.user, {
    cascade: true,
    eager: false,
    orphanedRowAction: 'delete',
  })
  accounts: Account[];
}
