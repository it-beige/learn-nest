import {
  ExecutionContext,
  Get,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { Request } from 'express';

export const Aaa = (...args: string[]) => {
  return SetMetadata('roles', args);
};

export function applyGetWithGuards(path, role) {
  return applyDecorators(Get(path), Aaa(role), UseGuards(AaaGuard));
}

export const customParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const query = request.query[data]
      ? JSON.parse((request.query[data] || '') as string)
      : {};
    return query;
  },
);
