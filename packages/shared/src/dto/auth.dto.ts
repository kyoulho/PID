import { Email, UUID } from "../types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { UserRole } from "../enum";

export class LoginRequestDTO {
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
  @Length(8, 20)
  password: string;
}

export class ChangePasswordDTO {
  @ApiProperty({
    description: "사용자 비밀번호",
    example: "StrongPassword123",
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20)
  currentPassword: string;

  @ApiProperty({
    description: "새로운 비밀번호",
    example: "StrongPassword123",
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20)
  newPassword: string;
}

export class Payload {
  email: Email;
  sub: UUID;
  role: UserRole;
}
export class TokenDTO {
  accessToken: string;
  refreshToken: string;
}

export class LoginDTO extends TokenDTO {
  changePasswordRequired: boolean;
}
