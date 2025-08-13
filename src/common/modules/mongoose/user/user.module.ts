import { ModelNames } from '@common/constants';
import { userSchemaFactory } from '@common/schemas/mongoose/user/user.schema';
import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';

const UserMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.USER,
  inject: [getConnectionToken()],
  useFactory: userSchemaFactory,
};

const userProviders = [UserMongooseDynamicModule];

@Module({
  imports: [],
  providers: userProviders,
  exports: userProviders,
})
export class UserMongooseModule {}
