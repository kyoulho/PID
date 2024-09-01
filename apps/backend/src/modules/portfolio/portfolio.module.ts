import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './entity/portfolio.entity';
import { PortfolioAsset } from './entity/portfolio-asset.entity';
import { AssetTradingRecord } from './entity/asset-trading-record.entity';
import { AssetDividendRecord } from './entity/asset-dividend-record.entity';

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
