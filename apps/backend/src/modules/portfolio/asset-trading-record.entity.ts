import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UUID } from '@pid/shared/dist';
import { Account } from '../account';
import { PortfolioAsset } from './portfolio-asset.entity';

export enum TradingType {
  BUY = 'BUY',
  SELL = 'SELL',
}

@Entity()
export class AssetTradingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Account, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => PortfolioAsset, (portfolioAsset) => portfolioAsset.records, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'portfolio_asset_id' })
  portfolioAsset: PortfolioAsset;

  @Column({ type: 'varchar', length: 50 })
  ticker: string;

  @Column({ type: 'varchar', length: 50 })
  tradingType: TradingType;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'bigint' })
  price: number;

  @Column({ type: 'date' })
  tradingDate: Date;
}
