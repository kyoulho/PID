import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountType } from './account-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType])],
  exports: [TypeOrmModule],
})
export class AccountModule {}
