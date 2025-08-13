import { ModelNames } from '@common/constants';
import { FactoryProvider, Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { UserMongooseModule } from '../user.module';
import { UserRoleSchemaFactory } from '@common/schemas/mongoose/user/user-role/user-role.schema';
import { UserRolesEventListener } from '@common/schemas/mongoose/user/user-role/user-role-listener';

const UserRolesMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.USER_ROLE,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: UserRoleSchemaFactory,
};

const userRolesProviders = [UserRolesMongooseDynamicModule, UserRolesEventListener];

@Module({
  imports: [UserMongooseModule],
  providers: userRolesProviders,
  exports: userRolesProviders,
})
export class UserRolesMongooseModule {}
