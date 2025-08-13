import { DeepLinkModelsEnum } from 'src/common/enums/deep-link.enum';

export interface IServiceProviderDeepLinkOptions {
  modelName: DeepLinkModelsEnum;
  modelId: string;
  queryParams?: Record<string, string | string[]>;
}
