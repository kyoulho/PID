import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StrategyDTO } from './dto/strategy.dto';
import { Strategy } from './entity/strategy.entity';
import { UUID } from '@pid/shared';

@Injectable()
export class StrategyService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
  ) {}

  async getStrategies(): Promise<StrategyDTO[]> {
    return await this.strategyRepository.find();
  }

  async getStrategyById(id: UUID): Promise<StrategyDTO> {
    return this.strategyRepository.findOneByOrFail({ id });
  }

  async createStrategy(strategyDTO: StrategyDTO): Promise<StrategyDTO> {
    const strategy = this.strategyRepository.create(strategyDTO);
    return this.strategyRepository.save(strategy);
  }

  async updateStrategy(
    id: string,
    strategyDTO: StrategyDTO,
  ): Promise<StrategyDTO> {
    await this.strategyRepository.update(id, strategyDTO);
    return this.getStrategyById(id);
  }

  async deleteStrategy(id: string): Promise<void> {
    await this.strategyRepository.delete(id);
  }
}
