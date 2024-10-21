import { Injectable } from '@nestjs/common';
import {
  CreateStrategyDTO,
  GetStrategyDTO,
  UpdateStrategyDTO,
  UUID,
} from '@mid/shared';
import { StrategyRepository } from './StrategyRepository';

@Injectable()
export class StrategyService {
  constructor(private readonly strategyRepository: StrategyRepository) {}

  async getStrategies(): Promise<GetStrategyDTO[]> {
    return await this.strategyRepository.find();
  }

  async getStrategy(id: UUID): Promise<GetStrategyDTO> {
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
    return await this.strategyRepository.deleteOrFail({ id });
  }
}
