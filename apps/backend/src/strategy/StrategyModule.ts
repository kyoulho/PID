import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './Strategy';
import { StrategyController } from './StrategyController';
import { StrategyService } from './StrategyService';
import { StrategyRepository } from './StrategyRepository';
import { AlgorithmService } from './AlgorithmService';
import { DataFetcherService } from './DataFetcherService';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
  controllers: [StrategyController],
  providers: [
    StrategyService,
    StrategyRepository,
    AlgorithmService,
    DataFetcherService,
  ],
  exports: [StrategyService],
})
export class StrategyModule {}
