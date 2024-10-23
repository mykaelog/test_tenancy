import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentId = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest<Request>();

    return request.params.id;
  },
);
