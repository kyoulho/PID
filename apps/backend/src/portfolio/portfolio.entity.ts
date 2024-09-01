import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioAsset } from './portfolio-asset.entity';
import { Strategy } from '../strategy/strategy.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  constructor() {
    this.portfolioAssets = [];
  }
}
