import { PickType } from '@nestjs/swagger';
import { UserRole } from '@common';

export class CreateRoleDto extends PickType(UserRole, ['name', 'permissions'] as const) {}
