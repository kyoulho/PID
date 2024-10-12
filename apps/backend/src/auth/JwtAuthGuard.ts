import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// TODO: 토큰이 없어도 그냥 통과됨
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
