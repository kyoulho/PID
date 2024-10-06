import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import {
  ChangePasswordDTO,
  LoginDTO,
  LoginRequestDTO,
  TokenDTO,
  UUID,
} from '@mid/shared';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUserId } from '../common/CustomDeco';
import { JwtAuthGuard } from './JwtAuthGuard';

@ApiTags('인증')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 사용자 로그인
  @Post('login')
  @ApiOperation({
    summary: '사용자 로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공 시 JWT 토큰을 반환합니다.',
  })
  @ApiBody({ type: LoginRequestDTO })
  async login(@Body() body: LoginRequestDTO): Promise<LoginDTO> {
    return this.authService.login(body);
  }

  // JWT 갱신 (토큰 재발급)
  @Get('reissue')
  @ApiOperation({
    summary: '토큰 재발급',
    description: '만료된 JWT 토큰을 재발급합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '새로운 JWT 토큰이 발급되었습니다.',
  })
  @UseGuards(JwtAuthGuard)
  async reIssue(@RequestUserId() userId: UUID): Promise<TokenDTO> {
    return this.authService.reIssue(userId);
  }

  @Post('change-password')
  @ApiOperation({
    summary: '비밀번호 변경',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiBody({ type: ChangePasswordDTO })
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @RequestUserId() userId: UUID,
    @Body() chagePasswordDTO: ChangePasswordDTO,
  ): Promise<void> {
    return this.authService.changePassword(userId, chagePasswordDTO);
  }
}
