import { UUID } from "../types";
import { RebalanceFrequency } from "../enum";

// 공통 DTO 필드를 포함하는 Base DTO
class BaseStrategyDTO {
  name: string;

  description?: string;

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
  name?: string;

  description?: string;

  rebalanceFrequency?: RebalanceFrequency;
}
