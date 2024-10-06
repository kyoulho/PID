import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './UserService';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '@mid/shared';

@ApiTags('사용자')
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '사용자 생성',
    description: '새로운 사용자를 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '사용자가 성공적으로 생성되었습니다.',
    type: GetUserDTO,
  })
  @ApiResponse({ status: 409, description: '이미 사용 중인 이메일입니다.' })
  @ApiBody({ type: CreateUserDTO })
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<GetUserDTO> {
    return this.userService.createUser(createUserDto);
  }

  // 사용자 변경
  @Put(':id')
  @ApiOperation({
    summary: '사용자 정보 수정',
    description: '기존 사용자의 정보를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '사용자 ID',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보가 성공적으로 수정되었습니다.',
    type: GetUserDTO,
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  @ApiBody({ type: UpdateUserDTO })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<GetUserDTO> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: '사용자 삭제',
    description: '기존 사용자를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '사용자 고유 ID',
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
  })
  @ApiResponse({
    status: 204,
    description: '사용자가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
