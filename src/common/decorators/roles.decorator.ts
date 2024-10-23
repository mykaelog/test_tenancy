import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums/roles.enum';

export const HAS_ROLES = 'HAS_ROLES';

export const HasRoles = (...roles: string[]) => SetMetadata(HAS_ROLES, roles);
