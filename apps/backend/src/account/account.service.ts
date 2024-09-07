import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import {
  CreateAccountDTO,
  GetAccountDTO,
  UpdateAccountDTO,
  UUID,
} from '@pid/shared';
import { CustomRepository } from '../common/custom.repository';
import { AccountType } from './account-type.entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: CustomRepository<Account>,
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: CustomRepository<AccountType>,
  ) {}

  // 계좌 생성
  async createAccount(
    createAccountDTO: CreateAccountDTO,
  ): Promise<GetAccountDTO> {
    const { accountTypeId, ...accountData } = createAccountDTO;

    // accountTypeId로 AccountType 찾기
    const accountType = await this.accountTypeRepository.findOneByOrFail({
      id: accountTypeId,
    });

    // Account 엔티티 생성 및 저장
    const account = this.accountRepository.create({
      ...accountData,
      accountType,
    });

    return await this.accountRepository
      .save(account)
      .then((account) => account.toDTO());
  }

  async getAccounts(): Promise<GetAccountDTO[]> {
    const accounts = await this.accountRepository.find({
      relations: ['accountType'],
    });
    return accounts.map((account) => account.toDTO());
  }

  async getAccountById(id: UUID): Promise<GetAccountDTO> {
    const account = await this.accountRepository.findOneOrFail({
      where: { id },
      relations: ['accountType'],
    });
    return account.toDTO();
  }

  async updateAccount(
    id: UUID,
    updateAccountDTO: UpdateAccountDTO,
  ): Promise<GetAccountDTO> {
    const { accountTypeId, ...updateData } = updateAccountDTO;

    const newAccount: DeepPartial<Account> = { ...updateData };

    // accountTypeId가 존재할 경우 accountType을 조회하여 data에 추가
    if (accountTypeId) {
      newAccount.accountType = await this.accountTypeRepository.findOneOrFail({
        where: { id: accountTypeId },
      });
    }

    await this.accountRepository.update(id, newAccount);

    return this.getAccountById(id);
  }

  // 계좌 삭제
  async deleteAccount(id: string): Promise<void> {
    await this.accountRepository.deleteOrFail(id);
  }
}
