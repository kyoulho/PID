import { UUID } from "../types";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
} from "class-validator";

export class BaseAccountDTO {
  @ApiProperty({
    description: "계좌 이름",
    example: "My Savings Account",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: "계좌 설명",
    example: "This is my primary savings account.",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "발급 기관",
    example: "Bank of Korea",
  })
  @IsString()
  @IsNotEmpty()
  issuer: string;

  @ApiProperty({
    description: "계좌 번호",
    example: "1234567890",
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: "이자율",
    example: 1.5,
  })
  @IsNumber()
  @IsNotEmpty()
  interestRate: number;

  @ApiProperty({
    description: "출금 한도",
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  withdrawalLimit: number;
}
export class CreateAccountDTO extends BaseAccountDTO {
  @ApiProperty({
    description: "계좌 유형 ID",
    example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  })
  @IsUUID()
  @IsNotEmpty()
  accountTypeId: UUID;
}
export class UpdateAccountDTO extends PartialType(CreateAccountDTO) {}

export class GetAccountDTO extends BaseAccountDTO {
  @ApiProperty({
    description: "계좌 고유 ID",
    example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  })
  id: UUID;

  @ApiProperty({
    description: "계좌 유형 이름",
    example: "Savings",
  })
  accountTypeName: string;

  @ApiProperty({
    description: "계좌 생성일",
    example: "2023-10-06T12:34:56.789Z",
  })
  createdAt: Date;
}
