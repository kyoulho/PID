import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { AssetTradingRecord } from './asset-trading-record.entity';
import { AssetDividendRecord } from './asset-dividend-record.entity';
import { UUID } from '@mid/shared';

@Entity()
export class PortfolioAsset {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioAssets, {
    lazy: true,
    nullable: false,
  })
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: Portfolio;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  intendedAsset: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  targetRatio: number;

  @OneToMany(
    () => AssetTradingRecord,
    (tradingRecord) => tradingRecord.portfolioAsset,
    {
      lazy: true,
      cascade: true,
      orphanedRowAction: 'delete',
    },
  )
  records: AssetTradingRecord[];

  @OneToMany(
    () => AssetDividendRecord,
    (dividendRecord) => dividendRecord.portfolioAsset,
    {
      lazy: true,
      cascade: true,
      orphanedRowAction: 'delete',
    },
  )
  dividends: AssetDividendRecord[];
}
