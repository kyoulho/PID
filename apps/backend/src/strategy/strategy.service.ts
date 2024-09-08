import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from './strategy.entity';
import {
  CreateStrategyDTO,
  GetStrategyDTO,
  UpdateStrategyDTO,
  UUID,
} from '@pid/shared';
import { CustomRepository } from 'common/custom.repository';

@Injectable()
export class StrategyService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: CustomRepository<Strategy>,
  ) {}

  async getStrategies(): Promise<GetStrategyDTO[]> {
    return await this.strategyRepository.find();
  }

  async getStrategyById(id: UUID): Promise<GetStrategyDTO> {
    return this.strategyRepository.findOneByOrFail({ id });
  }

  async createStrategy(
    strategyDTO: CreateStrategyDTO,
  ): Promise<GetStrategyDTO> {
    const strategy = this.strategyRepository.create(strategyDTO);
    return this.strategyRepository.save(strategy);
  }

  async updateStrategy(
    id: string,
    strategyDTO: UpdateStrategyDTO,
  ): Promise<GetStrategyDTO> {
    const strategy = await this.strategyRepository.findOneByOrFail({ id });
    Object.assign(strategy, strategyDTO);
    return await this.strategyRepository.save(strategy);
  }

  async deleteStrategy(id: string): Promise<void> {
    return await this.strategyRepository.deleteOrFail(id);
  }
}
