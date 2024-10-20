import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";
import { RebalanceFrequency, StrategyType } from "../enum";
import { UUID } from "../types";

class BaseStrategyDTO {
  @ApiProperty({
    description: "전략 이름",
    example: "Growth Strategy",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "전략 종류",
    example: StrategyType.DAA,
    enum: StrategyType,
  })
  @IsEnum(StrategyType)
  type: StrategyType;

  @ApiPropertyOptional({
    description: "전략 설명",
    example: "This strategy focuses on high-growth stocks.",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "전략 알고리즘",
    example: "function(){ return 'hello'; }",
  })
  @IsOptional()
  @IsString()
  algorithm?: string;

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
