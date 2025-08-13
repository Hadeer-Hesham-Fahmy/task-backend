import { RedisService } from '@liaoliaots/nestjs-redis';
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  User,
  AppConfig,
  AwsSESService,
  CustomError,
  ErrorType,
  IUserInstanceMethods,
  IUserModel,
  IUserRoleModel,
  ModelNames,
} from '@common';
import { HydratedDocument } from 'mongoose';
import { BaseAuthService } from './base-auth.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginEmailDto } from './dto/login-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ITempAccessTokenPayload } from './interfaces/temp-access-token.interface';
import { IRefreshTokenPayload } from './strategies/refresh-token/refresh-token-strategy-payload.interface';

@Injectable()
export class UserAuthService extends BaseAuthService {
  constructor(
    @Inject(ModelNames.USER) private _userModel: IUserModel,
    @Inject(ModelNames.USER_ROLE) private _userRole: IUserRoleModel,
    private readonly _appConfig: AppConfig,
    private readonly _jwtService: JwtService,
    private readonly _redisService: RedisService,
    private readonly sesService: AwsSESService,
  ) {
    super(_userModel, _appConfig, _jwtService, _redisService);
  }

  async loginUser(payload: LoginEmailDto, user: HydratedDocument<User, IUserInstanceMethods>) {
    const { password, rememberMe } = payload;
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Incorrect Email or password',
            ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
          },
          event: 'LOGIN_FAILED',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    const _user = user.toJSON();

    return {
      ..._user,
      ...(await this.generateTokens(user, rememberMe)),
    };
  }

  async refreshUserTokens(payload: IRefreshTokenPayload, refreshToken: string) {
    const { _id: userId, sessionId } = payload;

    const [userSessions, user] = await Promise.all([
      this.redis.lrange(userId, 0, -1),

      this.userModel.findById(userId, {
        name: 1,
        // phone: 1,
        role: 1,
        email: 1,
        password: 1,
      }),
    ]);

    if (!userSessions?.length || !userSessions?.includes(sessionId)) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid session',
            ar: 'جلسة غير صالحة',
          },
          event: 'INVALID_SESSION',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    return {
      ...user.toJSON(),
      ...(await this.generateAccessToken(user, sessionId)),
      refreshToken,
    };
  }

  async forgetPassword({ email }: ForgetPasswordDto) {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) return;

    const attempts = await this.redis.get(`${email}-trials`);

    if (Number(attempts) >= 3) {
      throw new ForbiddenException(
        new CustomError({
          localizedMessage: {
            en: 'You have exceeded the maximum number of attempts, please try again later',
            ar: 'لقد تجاوزت الحد الأقصى لعدد المحاولات ، يرجى المحاولة مرة أخرى لاحقًا',
          },
          event: 'MAX_ATTEMPTS_EXCEEDED',
          errorType: ErrorType.FORBIDDEN,
        }),
      );
    }

    const code = await this.generateEmailVerificationCode(email.toLowerCase(), attempts);

    console.log(code);
    await this.sesService.sendEmail({
      emails: email,
      subject: 'Email Verification',
      body: `Your verification code is ${code}. This code expires in 10 minutes.`,
    });
  }

  async verifyForgetPasswordEmail({ code, email }: VerifyEmailDto) {
    const storedCode = await this.redis.get(`${email.toLowerCase()}-verify`);

    if (!storedCode) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid email',
            ar: 'البريد الإلكتروني غير صحيح',
          },
          event: 'INVALID_EMAIL',
          errorType: ErrorType.WRONG_REQUEST,
        }),
      );
    }

    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid email',
            ar: 'البريد الإلكتروني غير صحيح',
          },
          event: 'INVALID_EMAIL',
          errorType: ErrorType.WRONG_REQUEST,
        }),
      );
    }

    await this.validateEmailVerificationCode({ email: email.toLowerCase(), code });

    return this.generateTempAccessToken(user._id?.toString());
  }

  async resetPassword({ accessToken, newPassword }: ResetPasswordDto) {
    const { _id }: ITempAccessTokenPayload = this.validateTempAccessToken(accessToken);

    const user = await this.userModel.findById(_id);

    if (!user) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid access token',
            ar: 'رمز الوصول غير صالح',
          },
          event: 'INVALID_ACCESS_TOKEN',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    user.password = newPassword;

    await user.save();
  }

  private generateTempAccessToken(userId: string) {
    const payload: ITempAccessTokenPayload = {
      _id: userId,
      temp: true,
    };

    return this.jwtService.sign(payload, {
      secret: this.appConfig.USER_JWT_SECRET,
      expiresIn: '10m',
    });
  }

  private validateTempAccessToken(accessToken: string) {
    const payload = this.jwtService.verify(accessToken, {
      secret: this.appConfig.USER_JWT_SECRET,
    });

    if (!payload?.temp) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid access token',
            ar: 'رمز الوصول غير صالح',
          },
          event: 'INVALID_ACCESS_TOKEN',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    return payload;
  }

  private async generateEmailVerificationCode(email: string, attempts?: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await Promise.all([
      this.redis.set(`${email.toLowerCase()}-trials`, (Number(attempts) || 0) + 1, 'EX', 3600), // 1 hour
      this.redis.set(`${email.toLowerCase()}-verify`, code, 'EX', 600), // 10 minutes
    ]);

    return code;
  }

  private async validateEmailVerificationCode({ email, code }: VerifyEmailDto) {
    const storedCode = await this.redis.get(`${email.toLowerCase()}-verify`);

    if (storedCode !== code) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Please enter the correct code.',
            ar: '.بالرجاء إدخال الرمز الصحيح',
          },
          event: 'INCORRECT_CODE',
          errorType: ErrorType.WRONG_REQUEST,
        }),
      );
    }

    await Promise.all([
      this.redis.del(`${email.toLowerCase()}-verify`),
      this.redis.del(`${email.toLowerCase()}-trials`),
    ]);
  }
}
