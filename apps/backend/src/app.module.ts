import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { StrategyModule } from './strategy/strategy.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pid',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccountModule,
    PortfolioModule,
    StrategyModule,
  ],
})
export class AppModule {}
