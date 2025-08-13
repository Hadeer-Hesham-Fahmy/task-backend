import { IsArray, IsEnum, IsInstance, IsString } from 'class-validator';
import { Model, Types } from 'mongoose';
import { BaseModel, IBaseInstanceMethods } from '../../base/base-schema';
import { UserFcmTopicsEnum } from './user-fcm-topics.enum';
import { TransformObjectId } from '@common/decorators/class-transformer';

export class UserFCMToken extends BaseModel<UserFCMToken> {
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  user: Types.ObjectId;

  @IsString()
  fcmToken: string;

  @IsArray()
  @IsString({ each: true })
  @IsEnum(UserFcmTopicsEnum, { each: true })
  topics: UserFcmTopicsEnum[];
}

export type IUserFCMTokenInstanceMethods = IBaseInstanceMethods;
export type IUserFCMTokenModel = Model<UserFCMToken, Record<string, unknown>, IUserFCMTokenInstanceMethods>;
