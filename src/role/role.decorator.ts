import { SetMetadata } from '@nestjs/common';
import { Roles } from './types/role';

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);
