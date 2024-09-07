import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  CreateAccountDTO,
  GetAccountDTO,
  UpdateAccountDTO,
  UUID,
} from '@pid/shared';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('account')
@Controller('/api/accounts') // 기본 경로 설정
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
  @UsePipes(new ValidationPipe({ transform: true })) // 유효성 검사 활성화
  async createAccount(
    @Body() createAccountDTO: CreateAccountDTO,
  ): Promise<GetAccountDTO> {
    return this.accountService.createAccount(createAccountDTO);
  }

  // 모든 계좌 조회
  @Get()
  @ApiOperation({ summary: '모든 계좌 정보를 가져옵니다.' })
  @ApiResponse({ status: 200, description: '계좌 목록', type: [GetAccountDTO] })
  async getAccounts(): Promise<GetAccountDTO[]> {
    return this.accountService.getAccounts();
  }

  // ID로 계좌 조회
  @Get(':id')
  @ApiOperation({ summary: 'ID를 통해 특정 계좌를 조회합니다.' })
  @ApiResponse({ status: 200, description: '계좌 정보', type: GetAccountDTO })
  async getAccountById(@Param('id') id: UUID): Promise<GetAccountDTO> {
    return this.accountService.getAccountById(id);
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
  @UsePipes(new ValidationPipe({ transform: true })) // 유효성 검사 활성화
  async updateAccount(
    @Param('id') id: UUID,
    @Body() updateAccountDTO: UpdateAccountDTO,
  ): Promise<GetAccountDTO> {
    return this.accountService.updateAccount(id, updateAccountDTO);
  }

  // 계좌 삭제
  @Delete(':id')
  @ApiOperation({ summary: 'ID로 계좌를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 계좌를 삭제했습니다.' })
  async deleteAccount(@Param('id') id: string): Promise<void> {
    return this.accountService.deleteAccount(id);
  }
}
