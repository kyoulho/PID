import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { Email, PhoneNumber, UUID } from "../types";
import { UserRole } from "../enum";

class BaseUserDTO {
  @ApiProperty({
    description: "사용자 이메일",
    example: "user@example.com",
  })
  @IsEmail()
  email: Email;

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

  @ApiProperty({
    description: "사용자 권한",
    example: "ADMIN",
  })
  @IsString()
  role: UserRole;
}

export class CreateUserDTO extends BaseUserDTO {
  @ApiProperty({
    description: "사용자 비밀번호",
    example: "StrongPassword123",
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20)
  password: string;
}

export class UpdateUserDTO extends PartialType(BaseUserDTO) {
  @ApiProperty({
    description: "사용자 비밀번호",
    example: "StrongPassword123",
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20)
  password: string;
}

export class GetUserDTO extends BaseUserDTO {
  @ApiProperty({
    description: "사용자 고유 ID",
    example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  })
  id: UUID;
}
