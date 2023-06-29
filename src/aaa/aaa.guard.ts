import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Guard');
    const classMetadata = this.reflector.get('roles', context.getClass());
    const controllerMetadata = this.reflector.get(
      'roles',
      context.getHandler(),
    );
    console.log(classMetadata, controllerMetadata);
    return true;
  }
}
