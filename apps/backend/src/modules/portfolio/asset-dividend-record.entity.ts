import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from '../account';
import { PortfolioAsset } from './portfolio-asset.entity';
import { UUID } from '@pid/shared/dist';

@Entity()
export class AssetDividendRecord {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => PortfolioAsset, (portfolioAsset) => portfolioAsset.records, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'portfolio_asset_id' })
  portfolioAsset: PortfolioAsset;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'date' })
  dividendDate: Date;

  @ManyToOne(() => Account, {
    lazy: false,
    nullable: false,
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
