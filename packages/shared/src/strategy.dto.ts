import { IsEnum, IsOptional, IsString } from 'class-validator';
import {UUID } from './uuid';
import { PartialType } from '@nestjs/swagger';
import {RebalanceFrequency} from "./rebalanceFrequency";

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
