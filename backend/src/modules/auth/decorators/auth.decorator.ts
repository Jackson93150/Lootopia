import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

export const AuthDecorator = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().user ?? null;
  },
);
