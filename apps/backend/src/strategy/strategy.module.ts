import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './strategy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
})
export class StrategyModule {}
