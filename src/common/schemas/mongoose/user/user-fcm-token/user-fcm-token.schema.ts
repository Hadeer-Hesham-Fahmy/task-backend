import { Connection, Schema } from 'mongoose';
import { BaseSchema } from '../../base/base-schema';
import { UserFCMToken, IUserFCMTokenInstanceMethods, IUserFCMTokenModel } from './user-fcm-token.type';
import { UserFcmTopicsEnum } from './user-fcm-topics.enum';
import { ModelNames } from '@common/constants';

const UserFCMTokenSchema = new Schema<UserFCMToken, IUserFCMTokenModel, IUserFCMTokenInstanceMethods>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.USER,
      required: true,
    },

    fcmToken: {
      type: String,
      required: true,
    },

    topics: {
      type: [String],
      enum: UserFcmTopicsEnum,
      required: false,
      default: [],
    },

    ...BaseSchema,
  },
  { timestamps: true },
);

export function userFCMTokenSchemaFactory(connection: Connection) {
  UserFCMTokenSchema.index({ user: 1 });
  UserFCMTokenSchema.index({ fcmToken: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });
  UserFCMTokenSchema.index({ user: 1, fcmToken: 1 });
  UserFCMTokenSchema.index({ user: 1, fcmToken: 1, deletedAt: 1 });

  const userFCMTokenModel = connection.model(ModelNames.USER_FCM_TOKEN, UserFCMTokenSchema);

  return userFCMTokenModel;
}
