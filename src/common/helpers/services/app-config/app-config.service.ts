import { EnvironmentEnum } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  NODE_ENV: string = this.configService.get('NODE_ENV');
  APP_SHORT_NAME: string = this.configService.get('APP_SHORT_NAME');

  MONGODB_URL: string = this.configService.get('MONGODB_URL');

  SA_NAME: string = this.configService.get('SA_NAME');
  SA_EMAIL: string = this.configService.get('SA_EMAIL');
  SA_PASSWORD: string = this.configService.get('SA_PASSWORD');
  SA_PHONE: string = this.configService.get('SA_PHONE');

  USER_JWT_SECRET: string = this.configService.get('USER_JWT_SECRET');
  USER_JWT_REFRESH_SECRET: string = this.configService.get('USER_JWT_REFRESH_SECRET');
  USER_JWT_EXPIRY: number = this.configService.get('USER_JWT_EXPIRY');
  USER_JWT_REFRESH_EXPIRY: string = this.configService.get('USER_JWT_REFRESH_EXPIRY');
  USER_JWT_PASSWORD_RESET_SECRET: string = this.configService.get('USER_JWT_PASSWORD_RESET_SECRET');
  USER_JWT_PASSWORD_RESET_EXPIRY: string = this.configService.get('USER_JWT_PASSWORD_RESET_EXPIRY');

  USER_FORGET_PASSWORD_URL: string = this.configService.get('USER_FORGET_PASSWORD_URL');

  EMPLOYEE_JWT_SECRET: string = this.configService.get('EMPLOYEE_JWT_SECRET');
  EMPLOYEE_JWT_REFRESH_SECRET: string = this.configService.get('EMPLOYEE_JWT_REFRESH_SECRET');
  EMPLOYEE_JWT_EXPIRY: string = this.configService.get('EMPLOYEE_JWT_EXPIRY');
  EMPLOYEE_JWT_REFRESH_EXPIRY: string = this.configService.get('EMPLOYEE_JWT_REFRESH_EXPIRY');



  AWS_SES_ACCESS_KEY_ID: string = this.configService.get('AWS_SES_ACCESS_KEY_ID');
  AWS_SES_SECRET_ACCESS_KEY: string = this.configService.get('AWS_SES_SECRET_ACCESS_KEY');
  AWS_SES_REGION: string = this.configService.get('AWS_SES_REGION');
  AWS_UPLOAD_BUCKET_NAME: string = this.configService.get('AWS_UPLOAD_BUCKET_NAME');
  AWS_UPLOAD_ACCESS_KEY_ID: string = this.configService.get('AWS_UPLOAD_ACCESS_KEY_ID');
  AWS_UPLOAD_SECRET_ACCESS_KEY: string = this.configService.get('AWS_UPLOAD_SECRET_ACCESS_KEY');
  AWS_UPLOAD_REGION: string = this.configService.get('AWS_UPLOAD_REGION');
  MEDIA_DOMAIN: string = this.configService.get('MEDIA_DOMAIN');

  MAX_FILE_SIZE: number = this.configService.get<number>('MAX_FILE_SIZE');

  REDIS_HOST: string = this.configService.get('REDIS_HOST');
  REDIS_PORT: number = this.configService.get('REDIS_PORT');

  TWILIO_ACCOUNT_SID: string = this.configService.get('TWILIO_ACCOUNT_SID');
  TWILIO_AUTH_TOKEN: string = this.configService.get('TWILIO_ACCOUNT_SID');
  S2S_JWT_SECRET: string = this.configService.get('S2S_JWT_SECRET');
  FIREBASE_USER_DEEP_LINKS_DOMAIN: string = this.configService.get('FIREBASE_USER_DEEP_LINKS_DOMAIN');
  FIREBASE_USER_DEFAULT_DEEP_LINK: string = this.configService.get('FIREBASE_USER_DEFAULT_DEEP_LINK');

  FIREBASE_EMPLOYEE_DEEP_LINKS_DOMAIN: string = this.configService.get('FIREBASE_EMPLOYEE_DEEP_LINKS_DOMAIN');
  FIREBASE_EMPLOYEE_DEFAULT_DEEP_LINK: string = this.configService.get('FIREBASE_EMPLOYEE_DEFAULT_DEEP_LINK');



  FIREBASE_TYPE_USER: string = this.configService.get('FIREBASE_TYPE_USER');
  FIREBASE_PROJECT_ID_USER: string = this.configService.get('FIREBASE_PROJECT_ID_USER');
  FIREBASE_PRIVATE_KEY_ID_USER: string = this.configService.get('FIREBASE_PRIVATE_KEY_ID_USER');
  FIREBASE_PRIVATE_KEY_USER: string = this.configService.get('FIREBASE_PRIVATE_KEY_USER');
  FIREBASE_CLIENT_EMAIL_USER: string = this.configService.get('FIREBASE_CLIENT_EMAIL_USER');
  FIREBASE_CLIENT_ID_USER: string = this.configService.get('FIREBASE_CLIENT_ID_USER');
  FIREBASE_AUTH_URI_USER: string = this.configService.get('FIREBASE_AUTH_URI_USER');
  FIREBASE_TOKEN_URI_USER: string = this.configService.get('FIREBASE_TOKEN_URI_USER');
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL_USER: string = this.configService.get(
    'FIREBASE_AUTH_PROVIDER_X509_CERT_URL_USER',
  );
  FIREBASE_CLIENT_X509_CERT_URL_USER: string = this.configService.get('FIREBASE_CLIENT_X509_CERT_URL_USER');
  FIREBASE_UNIVERSE_DOMAIN_USER: string = this.configService.get('FIREBASE_UNIVERSE_DOMAIN_USER');

  FIREBASE_TYPE_EMPLOYEE: string = this.configService.get('FIREBASE_TYPE_EMPLOYEE');
  FIREBASE_PROJECT_ID_EMPLOYEE: string = this.configService.get('FIREBASE_PROJECT_ID_EMPLOYEE');
  FIREBASE_PRIVATE_KEY_ID_EMPLOYEE: string = this.configService.get('FIREBASE_PRIVATE_KEY_ID_EMPLOYEE');
  FIREBASE_PRIVATE_KEY_EMPLOYEE: string = this.configService.get('FIREBASE_PRIVATE_KEY_EMPLOYEE');
  FIREBASE_CLIENT_EMAIL_EMPLOYEE: string = this.configService.get('FIREBASE_CLIENT_EMAIL_EMPLOYEE');
  FIREBASE_CLIENT_ID_EMPLOYEE: string = this.configService.get('FIREBASE_CLIENT_ID_EMPLOYEE');
  FIREBASE_AUTH_URI_EMPLOYEE: string = this.configService.get('FIREBASE_AUTH_URI_EMPLOYEE');
  FIREBASE_TOKEN_URI_EMPLOYEE: string = this.configService.get('FIREBASE_TOKEN_URI_EMPLOYEE');
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL_EMPLOYEE: string = this.configService.get(
    'FIREBASE_AUTH_PROVIDER_X509_CERT_URL_EMPLOYEE',
  );
  FIREBASE_CLIENT_X509_CERT_URL_EMPLOYEE: string = this.configService.get('FIREBASE_CLIENT_X509_CERT_URL_EMPLOYEE');
  FIREBASE_UNIVERSE_DOMAIN_EMPLOYEE: string = this.configService.get('FIREBASE_UNIVERSE_DOMAIN_EMPLOYEE');



  CLIENT_URL: string = this.configService.get('CLIENT_URL');

  get UPTIME() {
    return process.uptime();
  }

  static get NODE_ENV() {
    return process.env.NODE_ENV as EnvironmentEnum;
  }
}
