import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountType } from './account-type.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [TypeOrmModule],
})
export class AccountModule {}
