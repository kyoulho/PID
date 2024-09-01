import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseEnumPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { StrategyService } from './strategy.service';
import { StrategyDTO } from './dto/strategy.dto';
import { RebalanceFrequency } from '@pid/shared';

@ApiTags('strategies')
@Controller('/api/strategies')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Get()
  @ApiOperation({ summary: '모든 전략을 가져옵니다.' })
  @ApiResponse({ status: 200, type: [StrategyDTO] })
  async getStrategies(): Promise<StrategyDTO[]> {
    return this.strategyService.getStrategies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID로 전략을 가져옵니다.' })
  @ApiResponse({ status: 200, type: StrategyDTO })
  async getStrategyById(@Param('id') id: string): Promise<StrategyDTO> {
    return this.strategyService.getStrategyById(id);
  }

  @Post()
  @ApiOperation({ summary: '새로운 전략을 생성합니다.' })
  @ApiResponse({ status: 201, type: StrategyDTO })
  @ApiBody({ type: StrategyDTO })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createStrategy(
    @Body('rebalanceFrequency', new ParseEnumPipe(RebalanceFrequency))
    rebalanceFrequency: RebalanceFrequency,
    @Body() strategyDTO: StrategyDTO,
  ): Promise<StrategyDTO> {
    console.log(strategyDTO);
    return this.strategyService.createStrategy(strategyDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: '기존 전략을 업데이트합니다.' })
  @ApiResponse({ status: 200, type: StrategyDTO })
  @ApiBody({ type: StrategyDTO })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateStrategy(
    @Param('id') id: string,
    @Body() strategyDTO: StrategyDTO,
  ): Promise<StrategyDTO> {
    return this.strategyService.updateStrategy(id, strategyDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: '전략을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 전략을 삭제했습니다.' })
  async deleteStrategy(@Param('id') id: string): Promise<void> {
    return this.strategyService.deleteStrategy(id);
  }
}
