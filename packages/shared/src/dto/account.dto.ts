import { UUID } from "../types";

export class CreateAccountDTO {
  name: string;

  description?: string;

  issuer: string;

  number: string;

  interestRate: number;

  withdrawalLimit: number;

  accountTypeId: UUID;
}

// Update DTO
export class UpdateAccountDTO {
  name?: string;

  description?: string;

  issuer?: string;

  number?: string;

  interestRate?: number;

  withdrawalLimit?: number;

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
