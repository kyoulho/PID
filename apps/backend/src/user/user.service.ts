import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@mid/shared';
import { CustomRepository } from '../common/custom.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: CustomRepository<User>,
  ) {}

  // 사용자 생성
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name, phoneNumber } = createUserDto;

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
      email,
      encodedPassword: hashedPassword,
      name,
      phoneNumber,
    });

    return this.usersRepository.save(user);
  }

  // 사용자 업데이트
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.usersRepository.findOneOrFail({
      where: { id },
    });

    // 비밀번호 업데이트 처리
    if (updateUserDto.password) {
      user.encodedPassword = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);

    return user;
  }

  // 사용자 삭제
  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }
}
