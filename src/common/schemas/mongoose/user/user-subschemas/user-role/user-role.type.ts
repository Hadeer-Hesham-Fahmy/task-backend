import { TransformObjectId } from '@common/decorators/class-transformer';
import { PickType } from '@nestjs/swagger';
import { IsInstance } from 'class-validator';
import { Types } from 'mongoose';
import { UserRole } from '../../user-role/user-role.type';

export class UserRoleSubSchemaType extends PickType(UserRole, ['name', 'permissions']) {
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  _id: Types.ObjectId;
}
