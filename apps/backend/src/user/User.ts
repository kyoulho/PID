import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Email, PhoneNumber, UserRole, UUID } from '@mid/shared';
import { Account } from '../account/Account';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 50 })
  email: Email;

  @Column({ type: 'varchar', length: 60 })
  hashedPassword: string;

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

  @Column({ type: 'varchar', length: 10 })
  role: UserRole;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordChangedAt: Date;
}
