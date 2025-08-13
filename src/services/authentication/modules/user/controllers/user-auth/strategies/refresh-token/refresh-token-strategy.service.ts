import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig, IUserModel, ModelNames } from '@common';
import { BaseAuthService } from '../../base-auth.service';
import { IRefreshTokenPayload } from './refresh-token-strategy-payload.interface';

@Injectable()
export class RefreshTokenStrategyService extends BaseAuthService {
  constructor(
    @Inject(ModelNames.USER) private _userModel: IUserModel,
    private readonly _appConfig: AppConfig,
    private readonly _jwtService: JwtService,
    private readonly _redisService: RedisService,
  ) {
    super(_userModel, _appConfig, _jwtService, _redisService);
  }

  async validateUserSession(payload: IRefreshTokenPayload) {
    const { _id, sessionId } = payload;

    const userSessions = await this.redis.lrange(_id, 0, -1);

    if (!userSessions.includes(sessionId)) {
      return null;
    }

    return sessionId;
  }
}
