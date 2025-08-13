import { VirtualUserResourcesEnum } from '@common/enums';
import { UserResourcesEnum, UserResourceOperationsEnum } from '@common/schemas/mongoose/user/user-permissions';

export interface UserPermissionGuardMetadata {
  resource: UserResourcesEnum | VirtualUserResourcesEnum;
  operation: UserResourceOperationsEnum;
  paramKey?: string;
}
