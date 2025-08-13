import { DeepLinkModelsEnum, EmployeeDeepLinkSubModelsEnum } from 'src/common/enums/deep-link.enum';

// NOTE: Submodels arent used yet. They are here for future use.
interface IEmployeeDeepLinkSubModel {
  subModelName: EmployeeDeepLinkSubModelsEnum;
  subModelId: string;
}

export interface IEmployeeDeepLinkOptions {
  modelName: DeepLinkModelsEnum;
  modelId: string;
  // isMobApp?: boolean;
  subModels?: IEmployeeDeepLinkSubModel[];
  queryParams?: Record<string, string | string[]>;
  privateField?: boolean;
}
