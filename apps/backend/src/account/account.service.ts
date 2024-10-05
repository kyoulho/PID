import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import {
  CreateAccountDTO,
  GetAccountDTO,
  UpdateAccountDTO,
  UUID,
} from '@mid/shared';
import { CustomRepository } from '../common/custom.repository';
import { AccountType } from './account-type.entity';

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

    // 기존 계좌를 조회 (accountType 관계 로드 포함)
    const account = await this.accountRepository.findOneOrFail({
      where: { id },
      relations: ['accountType'],
    });

    // 업데이트할 데이터 병합
    Object.assign(account, updateData);

    // accountTypeId가 존재할 경우 accountType을 조회하여 추가
    if (accountTypeId && account.accountType.id !== accountTypeId) {
      account.accountType = await this.accountTypeRepository.findOneOrFail({
        where: { id: accountTypeId },
      });
    }
    const updatedAccount = await this.accountRepository.save(account);
    return updatedAccount.toDTO();
  }

  // 계좌 삭제
  async deleteAccount(id: string): Promise<void> {
    await this.accountRepository.deleteOrFail(id);
  }
}
