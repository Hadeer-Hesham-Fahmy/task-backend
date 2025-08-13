import { AppConfig } from '@common/helpers/services/app-config';
import { DeepLinkService } from '@common/helpers/services/deep-link.service';
import { TrieService } from '@common/helpers/services/trie.service';

export class MongooseCommonModule {
  private static providers = [DeepLinkService, AppConfig];

  static forRoot() {
    return {
      module: MongooseCommonModule,
      imports: [],
      providers: [...this.providers, TrieService],
      exports: [...this.providers],
      global: true,
    };
  }
}
