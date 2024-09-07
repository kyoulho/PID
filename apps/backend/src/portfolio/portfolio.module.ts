import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { PortfolioAsset } from './portfolio-asset.entity';
import { AssetTradingRecord } from './asset-trading-record.entity';
import { AssetDividendRecord } from './asset-dividend-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Portfolio,
      PortfolioAsset,
      AssetTradingRecord,
      AssetDividendRecord,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PortfolioModule {}
