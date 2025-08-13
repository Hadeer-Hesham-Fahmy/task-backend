import { Schema, SchemaDefinition, SchemaDefinitionType } from 'mongoose';
import { UserPermissionOperations, UserResourceOperationsEnum } from './user-operations.type';
import { UserResourcesEnum } from './user-resources.enum';
import { UserPermissions } from './user-permissions.type';

export const UserPermissionOperationSchema = new Schema<UserPermissionOperations>(
  {
    ...(() => {
      const obj: SchemaDefinition<SchemaDefinitionType<UserPermissionOperations>> = Object.create({});
      Object.values(UserResourceOperationsEnum).forEach((operation) => {
        obj[operation] = { type: Boolean, required: false };
      });
      return obj;
    })(),
  },
  { _id: false },
);

export const UserPermissionSchema = new Schema<UserPermissions>(
  {
    [UserResourcesEnum.TASKS]: {
      type: UserPermissionOperationSchema,
      required: true,
      default: {
        [UserResourceOperationsEnum.CREATE]: false,
        [UserResourceOperationsEnum.READ]: false,
        [UserResourceOperationsEnum.UPDATE]: false,
        [UserResourceOperationsEnum.DELETE]: false,
        [UserResourceOperationsEnum.FILTER]: false,
      },
    },

    
  },
  { _id: false },
);
