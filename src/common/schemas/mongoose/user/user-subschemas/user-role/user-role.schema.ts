import { Schema } from 'mongoose';
import { UserRoleSubSchemaType } from './user-role.type';
import { ModelNames } from '@common/constants';
import { UserPermissionSchema } from '../../user-permissions';
import { LocalizedTextSchema } from '@common/schemas/mongoose/common/localized-text';

export const UserRoleSubSchema = new Schema<UserRoleSubSchemaType>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.USER_ROLE,
      required: true,
    },
    name: {
      type: LocalizedTextSchema(),
      required: true,
    },
    permissions: {
      type: UserPermissionSchema,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: false,
  },
);
