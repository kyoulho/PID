import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './Strategy';
import { StrategyController } from './StrategyController';
import { StrategyService } from './StrategyService';
import { StrategyRepository } from './StrategyRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
  controllers: [StrategyController],
  providers: [StrategyService, StrategyRepository],
  exports: [StrategyService],
})
export class StrategyModule {}
