import { EventListenerErrorHandlerService } from '@common/modules/common/services/event-listener-handlers';
import { ModelNames } from '@common/constants';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { HydratedDocument } from 'mongoose';
import { UserRoleEventsEnum } from '../user-role.enum';
import { UserRole } from '../user-role.type';
import { IUserModel } from '../../user.type';

@Injectable()
export class UserRolesEventListener {
  constructor(
    @Inject(forwardRef(() => ModelNames.USER)) private userModel: IUserModel,
    private readonly errorHandler: EventListenerErrorHandlerService,
  ) {}

  @OnEvent(UserRoleEventsEnum.POST_SAVE_UPDATE_USER_ROLES, { promisify: true })
  async updateUserRoles(event: HydratedDocument<UserRole>) {
    return this.errorHandler.eventListenerErrorHandler(UserRoleEventsEnum.POST_SAVE_UPDATE_USER_ROLES, async () => {
      await this.userModel.updateMany(
        {
          'role._id': event._id,
        },
        {
          role: event.toObject(),
        },
      );
    });
  }
}
