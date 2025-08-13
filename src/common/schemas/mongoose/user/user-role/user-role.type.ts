import { IsObject, ValidateNested } from 'class-validator';
import { Model } from 'mongoose';
import { BaseModel, IBaseInstanceMethods } from '../../base/base-schema';
import { UserPermissions } from '../user-permissions';
import { LocalizedText } from '../../common/localized-text';

export class UserRole extends BaseModel<UserRole> {
  @IsObject()
  @ValidateNested()
  name: LocalizedText;

  @IsObject()
  @ValidateNested()
  permissions: UserPermissions;
}

export interface IUserRoleInstanceMethods extends IBaseInstanceMethods {}
export interface IUserRoleModel extends Model<UserRole, Record<string, unknown>, IUserRoleInstanceMethods> {}
