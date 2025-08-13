import { CustomError } from '@common/classes/custom-error.class';
import { USER_PERMISSION_GUARD_METADATA_KEY } from '@common/constants';
import { ErrorType, VirtualUserResourcesEnum } from '@common/enums';
import { UserJwtPersona } from '@common/interfaces/jwt-persona';
import { UserPermissionGuardMetadata } from '@common/interfaces/metadata';
import { UserPermissions, UserPermissionOperations } from '@common/schemas/mongoose/user/user-permissions';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  private virtualResourcesToExistingResourceMap = {
    // [VirtualUserResourcesEnum.REPLIES]: UserResourcesEnum.COMMENTS,
  };

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<UserPermissionGuardMetadata[]>(
      USER_PERMISSION_GUARD_METADATA_KEY,
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const isInvalid = permissions.some(
      (permission) => permission.paramKey && permission.resource !== VirtualUserResourcesEnum.UNKNOWN,
    );

    if (isInvalid) throw new Error('Invalid permission guard metadata');

    const request = context.switchToHttp().getRequest<Request>();

    const user = <UserJwtPersona>request.persona;

    const hasPermission = await this.hasPermission(permissions, user.permissions, request);

    if (!hasPermission) {
      throw new ForbiddenException(
        new CustomError({
          localizedMessage: {
            en: 'You are not allowed to perform this action',
            ar: 'لا يمكنك تنفيذ هذا الإجراء',
          },
          event: 'FORBIDDEN',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    return true;
  }

  private async hasPermission(
    permissions: UserPermissionGuardMetadata[],
    userPermissions: UserPermissions,
    request: Request,
  ): Promise<boolean> {
    const hasPermission = permissions.every((permission) => {
      const resourcePermissions: UserPermissionOperations =
        userPermissions[permission.resource] ||
        userPermissions[request.params[permission.paramKey]] ||
        userPermissions[this.virtualResourcesToExistingResourceMap[permission.resource]];

      if (!resourcePermissions) return false;

      return resourcePermissions[permission.operation];
    });

    return hasPermission;
  }
}
