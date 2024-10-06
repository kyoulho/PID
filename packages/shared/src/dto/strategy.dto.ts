import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";
import { RebalanceFrequency } from "../enum";
import { UUID } from "../types";
import { PartialType } from "@nestjs/mapped-types";

class BaseStrategyDTO {
  @ApiProperty({
    description: "전략 이름",
    example: "Growth Strategy",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "전략 설명",
    example: "This strategy focuses on high-growth stocks.",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "리밸런싱 빈도",
    example: RebalanceFrequency.MONTHLY,
    enum: RebalanceFrequency,
  })
  @IsEnum(RebalanceFrequency)
  rebalanceFrequency: RebalanceFrequency;
}
export class CreateStrategyDTO extends BaseStrategyDTO {}

export class GetStrategyDTO extends BaseStrategyDTO {
  id: UUID;
}

export class UpdateStrategyDTO extends PartialType(BaseStrategyDTO) {}
