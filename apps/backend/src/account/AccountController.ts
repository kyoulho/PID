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
import { AccountService } from './AccountService';
import {
  CreateAccountDTO,
  GetAccountDTO,
  UpdateAccountDTO,
  UUID,
} from '@mid/shared';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { RequestUserId } from '../common/CustomDeco';

@ApiBearerAuth('Authorization')
@ApiTags('계좌')
@Controller('/api/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 계좌 생성
  @Post()
  @ApiOperation({ summary: '새로운 계좌를 생성합니다.' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 생성된 계좌 정보.',
    type: GetAccountDTO,
  })
  @ApiBody({ type: CreateAccountDTO })
  @UseGuards(JwtAuthGuard)
  async createAccount(
    @RequestUserId() userId: UUID,
    @Body() createAccountDTO: CreateAccountDTO,
  ): Promise<GetAccountDTO> {
    return this.accountService.createAccount(userId, createAccountDTO);
  }

  // 모든 계좌 조회
  @Get()
  @ApiOperation({ summary: '모든 계좌 정보를 가져옵니다.' })
  @ApiResponse({ status: 200, description: '계좌 목록', type: [GetAccountDTO] })
  async getAccounts(@RequestUserId() userId: UUID): Promise<GetAccountDTO[]> {
    return this.accountService.getAccounts(userId);
  }

  // ID로 계좌 조회
  @Get(':id')
  @ApiOperation({ summary: 'ID를 통해 특정 계좌를 조회합니다.' })
  @ApiResponse({ status: 200, description: '계좌 정보', type: GetAccountDTO })
  async getAccountById(
    @RequestUserId() userId: UUID,
    @Param('id') accountId: UUID,
  ): Promise<GetAccountDTO> {
    return this.accountService.getAccountById(userId, accountId);
  }

  // 계좌 업데이트
  @Put(':id')
  @ApiOperation({ summary: 'ID로 계좌 정보를 업데이트합니다.' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 업데이트된 계좌 정보.',
    type: GetAccountDTO,
  })
  @ApiBody({ type: UpdateAccountDTO })
  async updateAccount(
    @RequestUserId() userId: UUID,
    @Param('id') accountId: UUID,
    @Body() updateAccountDTO: UpdateAccountDTO,
  ): Promise<GetAccountDTO> {
    return this.accountService.updateAccount(
      userId,
      accountId,
      updateAccountDTO,
    );
  }

  // 계좌 삭제
  @Delete(':id')
  @ApiOperation({ summary: 'ID로 계좌를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 계좌를 삭제했습니다.' })
  async deleteAccount(
    @RequestUserId() userId: UUID,
    @Param('id') accountId: UUID,
  ): Promise<void> {
    return this.accountService.deleteAccount(userId, accountId);
  }
}
