import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/BaseRepository';
import { AccountType } from './AccountType';

@Injectable()
export class AccountTypeRepository extends BaseRepository<AccountType> {
  constructor(private dataSource: DataSource) {
    super(AccountType, dataSource.createEntityManager());
  }
}
