import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './types/role';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  @Inject(Reflector) private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let roles = this.reflector.get<Roles[] | Roles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    } else if (!Array.isArray(roles)) {
      roles = [roles];
    }

    const request: Request & { query: { user: any } } = context
      .switchToHttp()
      .getRequest();
    let { user } = request.query;

    if (user) {
      user = JSON.parse(user);
    }
    if (user?.roles) {
      return user.roles.some((role) => roles.includes(role));
    }
    return false;
  }
}
