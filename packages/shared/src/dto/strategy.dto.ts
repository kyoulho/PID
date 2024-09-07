import { IsEnum, IsOptional, IsString } from 'class-validator';
import {UUID } from '../types/uuid';
import { PartialType } from '@nestjs/swagger';
import {RebalanceFrequency} from "../enum/rebalanceFrequency";

export class CreateStrategyDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(RebalanceFrequency)
  rebalanceFrequency: RebalanceFrequency;
}

export class GetStrategyDTO {
  id: UUID;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(RebalanceFrequency)
  rebalanceFrequency: RebalanceFrequency;
}

export class UpdateStrategyDTO extends PartialType(CreateStrategyDTO) {}
