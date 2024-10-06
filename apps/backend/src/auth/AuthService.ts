import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  ChangePasswordDTO,
  GetUserDTO,
  LoginDTO,
  LoginRequestDTO,
  Payload,
  TokenDTO,
  UUID,
} from '@mid/shared';
import { UserRepository } from '../user/UserRepository';
import { User } from '../user/User';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private readonly PASSWORD_EXPIRATION_DAYS = 90; // 비밀번호 만료 기간

  // 로그인 메서드
  async login(requestDTO: LoginRequestDTO): Promise<LoginDTO> {
    const { email, password } = requestDTO;

    // 이메일로 사용자 찾기
    const user = await this.userRepository.findOneByOrFail({ email });

    // 입력된 평문 비밀번호와 DB의 해싱된 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 잘못되었습니다.');
    }

    // 비밀번호 만료 체크
    const daysSinceLastChange =
      (Date.now() - new Date(user.lastPasswordChangedAt).getTime()) /
      (1000 * 60 * 60 * 24);

    const changePasswordRequired =
      daysSinceLastChange > this.PASSWORD_EXPIRATION_DAYS;

    // JWT 발급 및 비밀번호 만료 여부 반환
    const token = this.issueToken(user);
    return {
      ...token,
      changePasswordRequired,
    };
  }

  // JWT 발급 메서드 (accessToken, refreshToken 반환)
  private issueToken(user: GetUserDTO): TokenDTO {
    const payload: Payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '3h' }),
    };
  }

  // JWT 재발급 (리프레시)
  async reIssue(userId: UUID): Promise<TokenDTO> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    return this.issueToken(user);
  }

  // 비밀번호 변경 메서드
  async changePassword(
    userId: UUID,
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDTO;

    // 사용자 조회
    const user: User = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    // 입력된 현재 비밀번호와 해싱된 비밀번호 비교
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.hashedPassword,
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('현재 비밀번호가 맞지 않습니다.');
    }

    // 새 비밀번호 저장 및 변경 날짜 업데이트
    user.hashedPassword = await bcrypt.hash(newPassword, 10);
    user.lastPasswordChangedAt = new Date();

    await this.userRepository.save(user);
  }
}
