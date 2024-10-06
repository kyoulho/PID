import {
  ConflictException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO, UUID } from '@mid/shared';
import { UserRepository } from './UserRepository';
import * as bcrypt from 'bcrypt';
import { User } from './User';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name); // Logger 설정

  constructor(private usersRepository: UserRepository) {}

  // 사용자 생성
  async createUser(createUserDto: CreateUserDTO): Promise<GetUserDTO> {
    const { email, password } = createUserDto;

    // 이메일 중복 확인
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      hashedPassword, // 해싱된 비밀번호 저장
    });

    const savedUser = await this.usersRepository.save(user);
    this.logger.log(
      `새 사용자 생성 성공: ${savedUser.email} (ID: ${savedUser.id})`,
    );
    return UserService.toGetUserDTO(savedUser);
  }

  // 사용자 업데이트
  async updateUser(
    id: UUID,
    updateUserDto: UpdateUserDTO,
  ): Promise<GetUserDTO> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id },
    });

    // 만약 비밀번호가 업데이트되었다면 해싱 처리
    if (updateUserDto.password) {
      user.hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      this.logger.log(`사용자(ID: ${id}) 비밀번호 변경`);
      delete updateUserDto.password;
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    this.logger.log(
      `사용자 업데이트 성공: ${updatedUser.email} (ID: ${updatedUser.id})`,
    );
    return UserService.toGetUserDTO(updatedUser);
  }

  // 사용자 삭제
  async deleteUser(id: UUID): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    this.logger.log(`사용자 삭제 성공: ID ${id}`);
  }

  private static toGetUserDTO(user: User): GetUserDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
  }
}
