import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RebalanceFrequency, StrategyType, UUID } from '@mid/shared';

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

  @Column({ type: 'varchar', length: 200 })
  type: StrategyType;

  @Column({ type: 'text', nullable: true })
  algorithm?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
