import { Module } from '@nestjs/common';
import { AuthService } from './AuthService';
import { AuthController } from './AuthController';
import { JwtStrategy } from './JwtStrategy';
import { UserModule } from '../user/UserModule';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    UserModule,
    PassportModule,
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
