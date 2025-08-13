import { Module } from '@nestjs/common';
import { UserJWTStrategy, UserMongooseModule, UserRolesMongooseModule } from '@common';
import {
  UserAuthController,
  UserAuthService,
  LoginEmailGuard,
  LoginEmailStrategy,
  RefreshTokenGuard,
  RefreshTokenStrategy,
  RefreshTokenStrategyService,
} from './controllers';
import { PassportModule } from '@nestjs/passport';
import { UserJwtAuthGuard } from 'src/common/guards/user/user-jwt.guard';

@Module({
  imports: [
    UserMongooseModule,
    UserRolesMongooseModule,
    PassportModule.register({ session: false, property: 'persona' }),
  ],
  controllers: [UserAuthController],
  providers: [
    UserAuthService,

    // Guards and Strategies
    LoginEmailStrategy,
    LoginEmailGuard,
    RefreshTokenStrategy,
    RefreshTokenStrategyService,
    RefreshTokenGuard,

    // -----
    UserJwtAuthGuard,
    UserJWTStrategy,
  ],
})
export class UserAuthenticationModule {}
