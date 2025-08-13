import { DeepLinkModelsEnum, UserDeepLinkSubModelsEnum } from 'src/common/enums/deep-link.enum';

interface IUserDeepLinkSubModel {
  subModelName: UserDeepLinkSubModelsEnum;
  subModelId: string;
}

export interface IUserDeepLinkOptions {
  modelName: DeepLinkModelsEnum;
  modelId: string;
  // isMobApp?: boolean;
  subModels?: IUserDeepLinkSubModel[];
  queryParams?: Record<string, string | string[]>;
  privateField?: boolean;
}
