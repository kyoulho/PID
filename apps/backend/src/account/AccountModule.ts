import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './Account';
import { AccountType } from './AccountType';
import { AccountController } from './AccountController';
import { AccountService } from './AccountService';
import { UserModule } from '../user/UserModule';
import { AccountRepository } from './AccountRepository';
import { AccountTypeRepository } from './AccountTypeRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType]), UserModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, AccountTypeRepository],
  exports: [AccountService],
})
export class AccountModule {}
