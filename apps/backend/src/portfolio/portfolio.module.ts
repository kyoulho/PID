import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { PortfolioAsset } from './portfolio-asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioAsset])],
  exports: [TypeOrmModule],
})
export class PortfolioModule {}
