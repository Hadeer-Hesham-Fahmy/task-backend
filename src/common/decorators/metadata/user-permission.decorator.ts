import { USER_PERMISSION_GUARD_METADATA_KEY } from '@common/constants';
import { UserPermissionGuardMetadata } from '@common/interfaces/metadata';
import { SetMetadata } from '@nestjs/common';

export const UserPermission = (...permissions: UserPermissionGuardMetadata[]): MethodDecorator =>
  SetMetadata(USER_PERMISSION_GUARD_METADATA_KEY, permissions);
