import { OmitType, PickType } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { UserPermissionOperations } from './user-operations.type';
import { UserResourcesEnum } from './user-resources.enum';

export class UserPermissionReadOperation extends PickType(UserPermissionOperations, ['read'] as const) {}
export class UserPermissionReadUpdateOperation extends PickType(UserPermissionOperations, [
  'read',
  'update',
] as const) {}
export class UserPermissionReadUpdateDeleteOperation extends OmitType(UserPermissionOperations, ['create'] as const) {}
export class UserPermissionCreateReadUpdateOperation extends OmitType(UserPermissionOperations, ['delete'] as const) {}

export class UserPermissions implements Record<UserResourcesEnum, Partial<UserPermissionOperations>> {
  @IsObject()
  @ValidateNested()
  tasks: UserPermissionOperations;
}
