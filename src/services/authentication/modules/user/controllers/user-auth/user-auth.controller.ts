import { Body, Controller, Post, Req, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CustomResponse,
  IUserInstanceMethods,
  Persona,
  User,
  IsPrivateAuthOrPublic,
} from '@common';
import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginEmailDto } from './dto/login-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginEmailGuard } from './guards/login-email.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { IRefreshTokenPayload } from './strategies/refresh-token/refresh-token-strategy-payload.interface';
import { UserAuthService } from './user-auth.service';

@Controller({ version: VERSION_NEUTRAL })
@ApiTags('authentication-user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('private-auth/refresh-token')
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Persona() payload: IRefreshTokenPayload, @Req() req: Request) {
    const token = req.headers?.authorization?.split(' ')?.[1];
    const user = await this.userAuthService.refreshUserTokens(payload, token);

    return new CustomResponse().success({
      payload: { data: user },
      localizedMessage: {
        en: 'Token refreshed successfully',
        ar: 'تم تحديث الرقم السري بنجاح',
      },
      event: 'TOKEN_REFRESHED_SUCCESS',
    });
  }

  // Public Route
  @Post('public/login-email')
  @IsPrivateAuthOrPublic()
  @UseGuards(LoginEmailGuard)
  async loginUser(@Persona() user: HydratedDocument<User, IUserInstanceMethods>, @Body() body: LoginEmailDto) {
    const loggedInUser = await this.userAuthService.loginUser(body, user);

    return new CustomResponse().success({
      payload: { data: loggedInUser },
    });
  }

  // Public Route
  @Post('public/forget-password')
  @IsPrivateAuthOrPublic()
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    await this.userAuthService.forgetPassword(body);

    return new CustomResponse().success({});
  }

  // Public Route
  @Post('public/verify-forget-password-email')
  @IsPrivateAuthOrPublic()
  async verifyForgetPasswordEmail(@Body() body: VerifyEmailDto) {
    const accessToken = await this.userAuthService.verifyForgetPasswordEmail(body);

    return new CustomResponse().success({
      payload: { data: { accessToken } },
    });
  }

  // Private Auth Route
  @Post('reset-password')
  @IsPrivateAuthOrPublic()
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.userAuthService.resetPassword(body);

    return new CustomResponse().success({});
  }
}
