import { IsEnum, IsOptional, IsString } from "class-validator";
import { UUID } from "../types/uuid";
import { RebalanceFrequency } from "../enum/rebalanceFrequency";

// 공통 DTO 필드를 포함하는 Base DTO
class BaseStrategyDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(RebalanceFrequency)
  rebalanceFrequency: RebalanceFrequency;
}

// Create DTO
export class CreateStrategyDTO extends BaseStrategyDTO {}

// Get DTO
export class GetStrategyDTO extends BaseStrategyDTO {
  id: UUID;
}

// Update DTO
export class UpdateStrategyDTO {
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(RebalanceFrequency)
  rebalanceFrequency?: RebalanceFrequency;
}
