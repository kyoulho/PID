import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { UUID, RebalanceFrequency } from '@pid/shared';

@Entity()
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 1000 })
  description?: string;

  @Column({ type: 'varchar', length: 200 })
  rebalanceFrequency: RebalanceFrequency;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
