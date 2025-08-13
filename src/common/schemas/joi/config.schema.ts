import { AppConfigOptions } from '@common/interfaces/app-config-options';
import * as Joi from 'joi';

export const configSchema = (appConfig: AppConfigOptions) => {
  return Joi.object({
    APP_SHORT_NAME: Joi.string().default(appConfig.appShortName),
    NODE_ENV: Joi.string().required(),
    MONGODB_URL: Joi.string().required(),

    USER_JWT_SECRET: Joi.string().required(),
    USER_JWT_REFRESH_SECRET: Joi.string().required(),
    USER_JWT_EXPIRY: Joi.number().required(),
    USER_JWT_REFRESH_EXPIRY: Joi.string().required(),

    S2S_JWT_SECRET: Joi.string().required(),

    REDIS_HOST: Joi.string().optional().default('localhost'),
    REDIS_PORT: Joi.number().optional().default(6379),

    ELASTIC_SEARCH_URL: Joi.string().required(),

    LOGDNA_KEY: Joi.string().required(),

    AWS_UPLOAD_BUCKET_NAME: Joi.string().required(),
    AWS_UPLOAD_ACCESS_KEY_ID: Joi.string().required(),
    AWS_UPLOAD_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_UPLOAD_REGION: Joi.string().required(),

    MEDIA_DOMAIN: Joi.string().required(),

    AWS_SES_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SES_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_SES_REGION: Joi.string().required(),

    FIREBASE_USER_DEEP_LINKS_DOMAIN: Joi.string().required(),
    FIREBASE_USER_DEFAULT_DEEP_LINK: Joi.string().required(),

    // Manager
    MANAGER_EMAIL: Joi.string().required(),
    MANAGER_NAME_EN: Joi.string().required(),
    MANAGER_NAME_AR: Joi.string().required(),
    MANAGER_PASSWORD: Joi.string().required(),

    // User
    USER_EMAIL: Joi.string().required(),
    USER_NAME_EN: Joi.string().required(),
    USER_NAME_AR: Joi.string().required(),
    USER_PASSWORD: Joi.string().required(),

    //SECONDARY User
    SECONDARY_USER_EMAIL: Joi.string().required(),
    SECONDARY_USER_NAME_EN: Joi.string().required(),
    SECONDARY_USER_NAME_AR: Joi.string().required(),
    SECONDARY_USER_PASSWORD: Joi.string().required(),
  });
};
