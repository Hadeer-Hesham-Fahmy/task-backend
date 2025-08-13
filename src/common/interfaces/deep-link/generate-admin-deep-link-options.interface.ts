import { UserDeepLinkSubModelsEnum, DeepLinkModelsEnum } from 'src/common/enums/deep-link.enum';

// NOTE: Submodels arent used yet. They are here for future use.
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
