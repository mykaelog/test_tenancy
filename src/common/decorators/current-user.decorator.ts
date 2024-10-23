import type { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import type { UserRequestInterface } from '../interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserRequestInterface => {
    const request = context.switchToHttp().getRequest<Request>();

    return request.user;
  },
);
