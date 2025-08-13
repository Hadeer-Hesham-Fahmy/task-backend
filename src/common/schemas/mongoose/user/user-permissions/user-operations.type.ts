import { IsBoolean } from 'class-validator';

export enum UserResourceOperationsEnum {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  FILTER = 'filter',
}

export class UserPermissionOperations implements Record<UserResourceOperationsEnum, boolean> {
  @IsBoolean()
  create: boolean;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  update: boolean;

  @IsBoolean()
  delete: boolean;

  @IsBoolean()
  filter: boolean;
}
