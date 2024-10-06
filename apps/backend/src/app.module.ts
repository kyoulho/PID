import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/AccountModule';
import { PorfolioModule } from './portfolio/PorfolioModule';
import { StrategyModule } from './strategy/StrategyModule';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from './user/UserModule';
import { AuthModule } from './auth/AuthModule';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    AccountModule,
    PorfolioModule,
    StrategyModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
