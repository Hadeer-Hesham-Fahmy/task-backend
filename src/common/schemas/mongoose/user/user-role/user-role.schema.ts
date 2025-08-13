import { ModelNames } from '@common/constants';
import { validateSchema } from '@common/helpers/mongoose-schema-validation.helper';
import { Connection, Schema } from 'mongoose';
import { UserRole, IUserRoleInstanceMethods, IUserRoleModel } from './user-role.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRoleEventsEnum } from './user-role.enum';
import { BaseSchema } from '@common/schemas/mongoose/base/base-schema';
import { UserPermissionSchema } from '../user-permissions';
import { LocalizedTextSchema } from '../../common/localized-text';

export const UserRoleSchema = new Schema<UserRole, IUserRoleModel, IUserRoleInstanceMethods>(
  {
    name: {
      type: LocalizedTextSchema(),
      required: true,
    },

    permissions: {
      type: UserPermissionSchema,
      required: true,
    },

    ...BaseSchema,
  },
  {
    timestamps: true,
  },
);

export function UserRoleSchemaFactory(connection: Connection, eventEmitter: EventEmitter2) {
  UserRoleSchema.index({ 'name.en': 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });
  UserRoleSchema.index({ 'name.ar': 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });

  UserRoleSchema.pre('validate', async function () {
    await validateSchema(this, UserRole);
  });

  UserRoleSchema.pre('save', async function () {
    // this.wasNew = this.isNew;
  });

  UserRoleSchema.post('save', async function () {
    // if (this.wasNew) return;

    eventEmitter.emit(UserRoleEventsEnum.POST_SAVE_UPDATE_USER_ROLES, this);
  });

  const userRoleModel = connection.model(ModelNames.USER_ROLE, UserRoleSchema);

  return userRoleModel;
}
