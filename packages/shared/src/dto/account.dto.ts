import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UUID } from "../types/uuid";

export class CreateAccountDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  issuer: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  interestRate: number;

  @IsNumber()
  @IsNotEmpty()
  withdrawalLimit: number;

  @IsNotEmpty()
  accountTypeId: UUID;
}

// Update DTO
export class UpdateAccountDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  issuer?: string;

  @IsOptional()
  @IsString()
  number?: string;

  interestRate?: number;

  @IsOptional()
  @IsNumber()
  withdrawalLimit?: number;

  @IsOptional()
  accountTypeId?: UUID;
}

// Get DTO
export class GetAccountDTO {
  id: UUID;
  name: string;
  description?: string;
  issuer: string;
  number: string;
  interestRate: number;
  withdrawalLimit: number;
  accountTypeName: string;
  createdAt: Date;
}
