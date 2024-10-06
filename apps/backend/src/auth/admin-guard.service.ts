import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 유저가 ADMIN 권한을 가지고 있는지 확인
    if (user && user.role === 'ADMIN') {
      return true;
    } else {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }
  }
}
