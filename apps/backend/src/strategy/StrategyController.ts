import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StrategyService } from './StrategyService';
import {
  CreateStrategyDTO,
  GetStrategyDTO,
  UpdateStrategyDTO,
  UUID,
} from '@mid/shared';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { AdminGuard } from '../auth/AdminGuard';
import { AlgorithmService } from './AlgorithmService';

@ApiBearerAuth('Authorization')
@ApiTags('전략')
@Controller('/api/strategies')
export class StrategyController {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly algorithmService: AlgorithmService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '모든 전략을 가져옵니다.',
    description: '등록된 모든 전략을 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    type: [GetStrategyDTO],
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getStrategies(): Promise<GetStrategyDTO[]> {
    return this.strategyService.getStrategies();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'ID로 전략을 가져옵니다.',
    description: '전략 ID를 통해 특정 전략을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '조회할 전략의 고유 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 전략을 가져왔습니다.',
    type: GetStrategyDTO,
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 전략을 찾을 수 없습니다.',
  })
  @UseGuards(JwtAuthGuard)
  async getStrategyById(@Param('id') id: UUID): Promise<GetStrategyDTO> {
    return this.strategyService.getStrategyById(id);
  }

  @Post()
  @ApiOperation({
    summary: '새로운 전략을 생성합니다.',
    description:
      '전략 이름과 리밸런스 빈도를 포함하여 새로운 전략을 생성합니다.',
  })
  @ApiBody({ type: CreateStrategyDTO, description: '생성할 전략 정보' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 전략이 생성되었습니다.',
    type: GetStrategyDTO,
  })
  @ApiResponse({ status: 400, description: '잘못된 입력 데이터입니다.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createStrategy(
    @Body() strategyDTO: CreateStrategyDTO,
  ): Promise<GetStrategyDTO> {
    return this.strategyService.createStrategy(strategyDTO);
  }

  @Put(':id')
  @ApiOperation({
    summary: '기존 전략을 업데이트합니다.',
    description: '전략 ID를 기반으로 해당 전략의 정보를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '업데이트할 전략의 고유 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateStrategyDTO, description: '업데이트할 전략 정보' })
  @ApiResponse({ status: 400, description: '잘못된 입력 데이터입니다.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStrategy(
    @Param('id') id: UUID,
    @Body() strategyDTO: UpdateStrategyDTO,
  ): Promise<GetStrategyDTO> {
    return this.strategyService.updateStrategy(id, strategyDTO);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '전략을 삭제합니다.',
    description: '전략 ID를 통해 특정 전략을 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 전략의 고유 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteStrategy(@Param('id') id: UUID): Promise<void> {
    return this.strategyService.deleteStrategy(id);
  }

  @Get(':id/exec')
  @ApiOperation({
    summary: '전략 알고리즘을 실행합니다.',
    description: '전략 ID를 기반으로 알고리즘을 실행하고 그 결과를 반환합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '실행할 전략의 고유 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '알고리즘이 성공적으로 실행되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 전략을 찾을 수 없습니다.',
  })
  @UseGuards(JwtAuthGuard)
  async executeAlgorithm(@Param('id') id: UUID): Promise<string> {
    const strategy = await this.strategyService.getStrategyById(id);
    return this.algorithmService.executeAlgorithm(strategy.algorithm);
  }
}
