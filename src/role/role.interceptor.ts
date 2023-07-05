import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './types/role';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const roles = this.reflector.get<Roles[] | Roles>(
      'roles',
      context.getHandler(),
    );
    roles;
    return next.handle();
  }
}
