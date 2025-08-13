import { User, AppConfig, IUserModel } from '@common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';

@Injectable()
export class BaseAuthService {
  protected readonly redis: Redis;

  constructor(
    protected userModel: IUserModel,
    protected readonly appConfig: AppConfig,
    protected readonly jwtService: JwtService,
    protected readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }
  async generateAccessToken(user: HydratedDocument<User>, existingSessionId?: string) {
    const userId = user._id;

    let sessionId = existingSessionId;
    // Generate new session id and save it to redis
    if (!existingSessionId) sessionId = await this.createSession(user);

    const token = this.jwtService.sign(
      {
        _id: userId,
        name: user.name,
        email: user.email,
        permissions: user.role.permissions,
        sessionId,
      },
      {
        secret: this.appConfig.USER_JWT_SECRET,
        expiresIn: this.appConfig.USER_JWT_EXPIRY,
      },
    );

    return {
      accessToken: token,
      sessionId: sessionId,
    };
  }

  async createSession(user: HydratedDocument<User>) {
    const session = uuidV5(uuidV4(), uuidV4());

    await this.redis.lpush(user._id?.toString(), session);

    return session;
  }

  async generateRefreshToken(user: HydratedDocument<User>, sessionId: string, rememberMe = false) {
    const refreshToken = this.jwtService.sign(
      { sessionId, _id: user._id },
      {
        secret: this.appConfig.USER_JWT_REFRESH_SECRET,
        expiresIn: rememberMe ? this.appConfig.USER_JWT_REFRESH_EXPIRY : 7200, // 2 hours
      },
    );

    return {
      refreshToken,
    };
  }

  async generateTokens(user: HydratedDocument<User>, rememberMe = false) {
    const { accessToken, sessionId: newSessionId } = await this.generateAccessToken(user);

    const { refreshToken } = await this.generateRefreshToken(user, newSessionId, rememberMe);

    return {
      accessToken,
      refreshToken,
    };
  }
}
