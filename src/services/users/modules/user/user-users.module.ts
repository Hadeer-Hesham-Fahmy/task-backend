import { Module } from '@nestjs/common';
import { UserRolesController, UserRolesService } from './controllers';
import { UserMongooseModule, UserRolesMongooseModule } from '@common';

@Module({
  imports: [UserMongooseModule, UserRolesMongooseModule],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserUsersModule {}
