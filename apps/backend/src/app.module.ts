import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { StrategyModule } from './modules/strategy/strategy.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AccountModule,
    PortfolioModule,
    StrategyModule,
  ],
})
export class AppModule {}
