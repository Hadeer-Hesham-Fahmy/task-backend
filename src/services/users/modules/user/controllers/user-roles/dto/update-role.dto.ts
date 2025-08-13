import { PartialType, PickType } from '@nestjs/swagger';
import { UserRole } from '@common';

export class UpdateRoleBodyDto extends PartialType(PickType(UserRole, ['name', 'permissions'] as const)) {}
