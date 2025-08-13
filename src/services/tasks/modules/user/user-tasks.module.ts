import { AppConfig, AwsS3Module, AwsSESModule, UserMongooseModule, UserRolesMongooseModule } from '@common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserTasksController } from './controllers/task.controller';
import { UserTasksService } from './controllers/task.service';
import { TaskMongooseModule } from '@common/modules/mongoose/task';

@Module({
  imports: [
    TaskMongooseModule,
    UserMongooseModule,
    UserRolesMongooseModule,
    PassportModule.register({ session: false, property: 'persona' }),
    AwsSESModule.registerAsync({
      useFactory: (appConfig: AppConfig) => ({
        accessKeyId: appConfig.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_SES_SECRET_ACCESS_KEY,
        region: appConfig.AWS_SES_REGION,
      }),
      inject: [AppConfig],
    }),
    AwsS3Module.registerAsync({
      useFactory: (appConfig: AppConfig) => ({
        accessKeyId: appConfig.AWS_UPLOAD_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_UPLOAD_SECRET_ACCESS_KEY,
        region: appConfig.AWS_UPLOAD_REGION,
      }),
      inject: [AppConfig],
    }),
  ],
  controllers: [UserTasksController],
  providers: [UserTasksService],
})
export class UserTasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(transformRequestEmails).forRoutes(UserAuthController);
  }
}
