import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

// 커스텀 데코레이터 - Authorization 헤더에서 JWT의 sub 필드(userId)를 추출
export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.sub;
  },
);

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
