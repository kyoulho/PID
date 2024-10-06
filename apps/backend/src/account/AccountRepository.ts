import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from './Account';
import { BaseRepository } from '../common/BaseRepository';

@Injectable()
export class AccountRepository extends BaseRepository<Account> {
  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }
}
