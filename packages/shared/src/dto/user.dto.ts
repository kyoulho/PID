import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { Email, PhoneNumber, UUID } from "../types";

class BaseUserDto {
  @ApiProperty({
    description: "사용자 이름",
    example: "홍길동",
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    description: "사용자 전화번호",
    example: "01012345678",
    minLength: 10,
    maxLength: 11,
  })
  @IsString()
  @Length(10, 11)
  phoneNumber: PhoneNumber;
}

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    description: "사용자 이메일",
    example: "user@example.com",
  })
  @IsEmail()
  email: Email;

  @ApiProperty({
    description: "사용자 비밀번호",
    example: "StrongPassword123",
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @Length(6, 20)
  password: string;
}

export class UpdateUserDto extends PartialType(BaseUserDto) {
  @ApiProperty({
    description: "사용자 비밀번호 (선택 사항)",
    example: "StrongPassword123",
    required: false, // 선택적 필드로 표시
  })
  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;
}

export class GetUserDto extends BaseUserDto {
  @ApiProperty({
    description: "사용자 고유 ID",
    example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  })
  id: UUID;

  @ApiProperty({
    description: "사용자 이메일",
    example: "user@example.com",
  })
  @IsEmail()
  email: Email;
}
