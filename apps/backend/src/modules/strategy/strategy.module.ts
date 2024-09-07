import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './strategy.entity';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
  controllers: [StrategyController],
  providers: [StrategyService],
})
export class StrategyModule {}
