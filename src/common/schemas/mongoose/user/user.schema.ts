import { ModelNames } from '@common/constants';
import { validateSchema } from '@common/helpers/mongoose-schema-validation.helper';
import { Schema, Connection, HydratedDocument } from 'mongoose';
import { User, IUserModel, IUserInstanceMethods } from './user.type';
import { BaseSchema } from '../base/base-schema';
import { UserRoleSubSchema } from './user-subschemas/user-role';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from './user.enum';
import { LocalizedTextSchema } from '../common/localized-text';

export const UserSchema = new Schema<User, IUserModel, IUserInstanceMethods>(
  {
    name: {
      type: LocalizedTextSchema(),
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePictureUrl: {
      type: String,
      required: false,
    },

    role: {
      type: UserRoleSubSchema,
      required: true,
    },

  

    ...BaseSchema,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

export function userSchemaFactory(connection: Connection) {
  UserSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });
  UserSchema.index({ _id: 1, 'name.en': 1 });
  UserSchema.index({ _id: 1, 'name.ar': 1 });
  UserSchema.index({ 'role._id': 1 });

  UserSchema.pre('validate', async function () {

    await validateSchema(this, User);

  });

  UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  UserSchema.methods.comparePassword = async function (this: HydratedDocument<User>, password: string) {
    return bcrypt.compare(password, this.password);
  };

  UserSchema.methods.deleteDoc = async function (this: HydratedDocument<User>) {
    this.deletedAt = new Date();
    await this.save();
  };

  const userModel = connection.model(ModelNames.USER, UserSchema);

  return userModel;
}
