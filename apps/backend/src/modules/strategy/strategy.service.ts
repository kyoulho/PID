import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from './strategy.entity';
import {
  UUID,
  GetStrategyDTO,
  CreateStrategyDTO,
  UpdateStrategyDTO,
} from '@pid/shared/dist';

@Injectable()
export class StrategyService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
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
    await this.strategyRepository.update(id, strategyDTO);
    return this.getStrategyById(id);
  }

  async deleteStrategy(id: string): Promise<void> {
    const result = await this.strategyRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `ID: ${id}에 해당하는 전략을 찾을 수 없습니다.`,
      );
    }
  }
}
