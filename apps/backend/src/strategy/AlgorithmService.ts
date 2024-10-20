// src/algorithms/algorithm.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { StrategyService } from './StrategyService';
import { DataFetcherService } from './DataFetcherService';
import yaml from 'js-yaml';

@Injectable()
export class AlgorithmService {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly dataFetcherService: DataFetcherService,
  ) {}

  async executeAlgorithm(algorithm: string): Promise<string> {
    if (!algorithm) {
      throw new BadRequestException(
        'Algorithm is not defined for this strategy.',
      );
    }

    const parsedAlgorithm = yaml.load(algorithm);
    const { error } = this.strategySchema.validate(parsedAlgorithm);
    if (error) {
      throw new BadRequestException(
        `YAML Schema validation error: ${error.message}`,
      );
    }

    const { conditions, actions, data_sources } = parsedAlgorithm.strategy;

    // 외부 데이터 가져오기
    const data = await this.fetchExternalData(data_sources);

    // 조건 평가
    const conditionMet = this.evaluateConditions(conditions, data);

    // 행동 결정
    const action = conditionMet ? actions.if_true : actions.if_false;

    return action;
  }
  // 야믈 관련 공통으로 빼기
  private strategySchema = Joi.object({
    strategy: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow(''),
      data_sources: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            type: Joi.string().valid('api').required(),
            url: Joi.string().uri().required(),
            method: Joi.string().valid('GET', 'POST').required(),
            payload: Joi.object().optional(),
            params: Joi.object().optional(),
            parser: Joi.string().required(),
          }),
        )
        .required(),
      conditions: Joi.object({
        unemployment_rate: Joi.object({
          current: Joi.string().valid('greater_than', 'less_than').required(),
          comparison: Joi.string().valid('twelve_month_average').required(),
        }).required(),
        sp500: Joi.object({
          current: Joi.string().valid('greater_than', 'less_than').required(),
          moving_average: Joi.string().required(),
        }).required(),
      }).required(),
      actions: Joi.object({
        if_true: Joi.string().required(),
        if_false: Joi.string().required(),
      }).required(),
    }).required(),
  });

  private async fetchExternalData(dataSources: any[]): Promise<any> {
    const data: { [key: string]: any } = {};

    for (const source of dataSources) {
      data[source.name] = await this.dataFetcherService.fetchData(source);
    }

    return data;
  }

  private evaluateConditions(conditions: any, data: any): boolean {
    const unemploymentCondition =
      conditions.unemployment_rate.current === 'greater_than'
        ? data.unemployment_rate.current >
          data.unemployment_rate.twelve_month_average
        : data.unemployment_rate.current <
          data.unemployment_rate.twelve_month_average;

    const sp500Condition =
      conditions.sp500.current === 'greater_than'
        ? data.sp500.current > data.sp500.moving_average
        : data.sp500.current < data.sp500.moving_average;

    return unemploymentCondition && sp500Condition;
  }
}
