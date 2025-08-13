import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserStatusEnum, CustomError, ErrorType, IUserModel, ModelNames } from '@common';
import { Strategy } from 'passport-local';

@Injectable()
export class LoginEmailStrategy extends PassportStrategy(Strategy, 'user-login-email') {
  constructor(@Inject(ModelNames.USER) private userModel: IUserModel) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne(
      { email: email.toLowerCase() },
      { name: 1, role: 1, email: 1, password: 1 },
    );

    if (!user) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Incorrect email or password',
            ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
          },
          event: 'LOGIN_FAILED',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }



    return user;
  }
}
