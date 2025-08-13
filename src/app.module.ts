import { AppConfig, CommonModule, EnvironmentEnum } from '@common';
import { Module } from '@nestjs/common';
import { UsersServiceModule, AuthenticationServiceModule } from './services';
import { TasksServiceModule } from './services/tasks/tasks-service.module';
@Module({
  imports: [

    TasksServiceModule,
    AuthenticationServiceModule,
    UsersServiceModule,
    CommonModule.registerAsync({
      appConfig: {
        appShortName: 'task-backend',
      },
      useFactory: {
        default: () => ({
          memoryConfig: {
            minHeapSizeInBytes: 512 * 1024 * 1024,
            maxHeapSizeInBytes: 4096 * 1024 * 1024,
          },
        }),
      },
      inject: {
        default: [],
      },
    }),

  

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
