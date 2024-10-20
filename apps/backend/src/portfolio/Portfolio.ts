import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioAsset } from './PortfolioAsset';
import { UUID } from '@mid/shared';
import { Strategy } from '../strategy/Strategy';
import { User } from '../user/User';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Strategy, { lazy: true, nullable: false })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy;

  @OneToMany(
    () => PortfolioAsset,
    (portfolioAsset) => portfolioAsset.portfolio,
    {
      cascade: true,
      eager: true,
      orphanedRowAction: 'delete',
    },
  )
  portfolioAssets: PortfolioAsset[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  user: User;
}
