import { Injectable } from '@nestjs/common';
import {
  CreateAccountDTO,
  GetAccountDTO,
  UpdateAccountDTO,
  UUID,
} from '@mid/shared';
import { AccountRepository } from './AccountRepository';
import { AccountTypeRepository } from './AccountTypeRepository';
import { Account } from './Account';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  // 계좌 생성
  async createAccount(
    userId: UUID,
    createAccountDTO: CreateAccountDTO,
  ): Promise<GetAccountDTO> {
    const { accountTypeId, ...accountData } = createAccountDTO;

    const accountType = await this.accountTypeRepository.findOneByOrFail({
      id: accountTypeId,
    });

    // Account 엔티티 생성 및 저장
    const account = this.accountRepository.create({
      ...accountData,
      accountType,
      user: { id: userId },
    });

    return await this.accountRepository
      .save(account)
      .then((account) => AccountService.toGetAccountDTO(account));
  }

  async getAccounts(userId): Promise<GetAccountDTO[]> {
    const accounts = await this.accountRepository.find({
      where: { user: { id: userId } },
      relations: ['accountType'],
    });
    return accounts.map((account) => AccountService.toGetAccountDTO(account));
  }

  async getAccountById(userId: UUID, accountId: UUID): Promise<GetAccountDTO> {
    const account = await this.accountRepository.findOneOrFail({
      where: { id: accountId, user: { id: userId } },
      relations: ['accountType'],
    });
    return AccountService.toGetAccountDTO(account);
  }

  async updateAccount(
    userId: UUID,
    accountId: UUID,
    updateAccountDTO: UpdateAccountDTO,
  ): Promise<GetAccountDTO> {
    const { accountTypeId, ...updateData } = updateAccountDTO;

    // 기존 계좌를 조회 (accountType 관계 로드 포함)
    const account = await this.accountRepository.findOneOrFail({
      where: { id: accountId, user: { id: userId } },
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

    return AccountService.toGetAccountDTO(updatedAccount);
  }

  // 계좌 삭제
  async deleteAccount(userId: string, accountId: UUID): Promise<void> {
    await this.accountRepository.deleteOrFail({
      user: { id: userId },
      id: accountId,
    });
  }

  private static toGetAccountDTO(account: Account) {
    return {
      id: account.id,
      name: account.name,
      description: account.description,
      issuer: account.issuer,
      number: account.number,
      interestRate: account.interestRate,
      withdrawalLimit: account.withdrawalLimit,
      accountTypeName: account.accountType.name,
      createdAt: account.createdAt,
    };
  }
}
