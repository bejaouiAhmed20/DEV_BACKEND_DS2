import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../entities/user.entity';

// Bech n7ot el roles eli lazmin
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
