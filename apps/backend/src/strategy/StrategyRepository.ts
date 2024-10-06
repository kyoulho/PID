import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/BaseRepository';
import { Strategy } from './Strategy';

@Injectable()
export class StrategyRepository extends BaseRepository<Strategy> {
  constructor(private dataSource: DataSource) {
    super(Strategy, dataSource.createEntityManager());
  }
}
