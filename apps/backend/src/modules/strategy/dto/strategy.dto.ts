import { ApiProperty } from '@nestjs/swagger';
import { RebalanceFrequency } from '@pid/shared';

export class StrategyDTO {
  @ApiProperty({
    description: '전략의 고유 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: '전략의 이름',
    example: 'Accelerate Dual Momentum',
  })
  name: string;

  @ApiProperty({
    description: '전략에 대한 설명',
    example: 'This strategy focuses on growth stocks.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: '리밸런스 빈도',
    enum: RebalanceFrequency,
    example: RebalanceFrequency.MONTHLY,
  })
  rebalanceFrequency: RebalanceFrequency;

  @ApiProperty({
    description: '전략이 생성된 날짜',
    example: '2023-09-01T12:34:56Z',
    required: false,
  })
  createdAt?: Date;
}
