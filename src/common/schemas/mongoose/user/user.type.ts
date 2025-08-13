import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Model } from 'mongoose';
import { BaseModel, IBaseInstanceMethods } from '../base/base-schema';
import { UserRoleSubSchemaType } from './user-subschemas/user-role';
import { UserStatusEnum } from './user.enum';
import { LocalizedText } from '../common/localized-text';
import { ApiProperty } from '@nestjs/swagger';

export class User extends BaseModel<User> {
  @IsObject()
  @ValidateNested()
  name: LocalizedText;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsOptional()
  @IsUrl()
  profilePictureUrl?: string;

  @IsObject()
  @ValidateNested()
  role: UserRoleSubSchemaType;
}

export interface IUserInstanceMethods extends IBaseInstanceMethods {
  comparePassword(password: string): Promise<boolean>;
}
export interface IUserModel extends Model<User, Record<string, unknown>, IUserInstanceMethods> {}
