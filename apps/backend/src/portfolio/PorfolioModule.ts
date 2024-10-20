import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './Portfolio';
import { PortfolioAsset } from './PortfolioAsset';
import { AssetTradingRecord } from './AssetTradingRecord';
import { AssetDividendRecord } from './AssetDividendRecord';

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
