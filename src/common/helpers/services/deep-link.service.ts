import { Injectable } from '@nestjs/common';
import { TrieService } from './trie.service';
import { IUserDeepLinkOptions } from 'src/common/interfaces/deep-link';
import { IEmployeeDeepLinkOptions } from 'src/common/interfaces/deep-link/generate-employee-deep-link-options.interface';
import { AppConfig } from './app-config';

@Injectable()
export class DeepLinkService {
  private deepLinkPaths = {
    task: [
      ['task', 'tasks'],
      ['task', ':taskId'],
      ['task', 'tasks'],
      ['task', 'tasks', ':taskId'],
      ['task', 'tasks'],
      ['task', 'tasks', ':taskId'],
    ],
    case: [
      ['case', 'cases'],
      ['case', 'cases', ':caseId'],
      ['case', 'cases'],
      ['case', 'cases', ':caseId'],
      ['case', 'cases'],
      ['case', 'cases', ':caseId'],
    ],

    employee: [
      ['employee', 'employees'],
      ['employee', 'employees', ':employeeId'],
      ['employee', 'employees'],
      ['employee', 'employees', ':employeeId'],
      ['employee', 'employees'],
      ['employee', 'employees', ':employeeId'],
    ],
    // Uncomment and adjust as needed
    // roundOfInvitation: [['round-of-invitations'], ['round-of-invitations', ':roundOfInvitationId']],
    // user: [['users'], ['users', ':userId'], ['user', ':userId', 'user-document', ':userDocumentId']],
    // user: [['users'], ['users', ':userId']],
  };

  constructor(private readonly appConfig: AppConfig, private readonly trie: TrieService) {
    this.constructTrie();
  }

  generateUserDeepLink(options: IUserDeepLinkOptions) {
    return this.generateDeepLink(
      options,
      'user',
      this.appConfig.FIREBASE_USER_DEEP_LINKS_DOMAIN, // Required parameter
      // options.isMobApp, // Optional
      options.privateField, // Optional
      this.appConfig.FIREBASE_USER_DEFAULT_DEEP_LINK, // Optional
    );
  }

  generateEmployeeDeepLink(options: IEmployeeDeepLinkOptions) {
    return this.generateDeepLink(
      options,
      'employee',
      this.appConfig.FIREBASE_EMPLOYEE_DEEP_LINKS_DOMAIN, // Required parameter
      // options.isMobApp, // Optional
      options.privateField, // Optional
      this.appConfig.FIREBASE_EMPLOYEE_DEFAULT_DEEP_LINK, // Optional
    );
  }



  private generateDeepLink(
    options: IUserDeepLinkOptions | IEmployeeDeepLinkOptions | IUserDeepLinkOptions,
    role: string,
    domain: string, // Make this a required parameter
    // isMobApp?: boolean, // Optional parameter
    privateField?: boolean, // Optional parameter
    defaultDeepLink?: string, // Optional parameter
  ) {
    const { modelName, subModels, queryParams } = options;

    console.log(`Generating deep link with privateField: ${privateField}`);

    // Initialize deepLink with domain
    let deepLink = `${domain}`;

    deepLink += `/${modelName}/${role}`; // Append modelName and role

    // Append '/private' or '/public' based on privateField
    deepLink += privateField ? '/private' : '/public';

    // Append subModels if present
    subModels?.forEach(({ subModelName, subModelId }) => {
      deepLink += `/${subModelName}/${subModelId}`;
    });

    // Uncomment this if you need to validate deep links
    // if (!this.validateDeepLink(deepLink, domain)) {
    //   this.logger.error(`Invalid ${role} deep link generated: ${deepLink}`, {
    //     modelName,
    //     ...(subModels && { subModels }),
    //   });
    //   return defaultDeepLink;
    // }

    return this.addQueryParamsToDeepLink(deepLink, queryParams);
  }

  private validateDeepLink(deepLink: string, domain: string): boolean {
    const urlWithoutDomain = deepLink.replace(domain + '/', '');
    return this.trie.validateUrl(urlWithoutDomain);
  }

  private addQueryParamsToDeepLink(deepLink: string, queryParams: Record<string, string | string[]>) {
    if (!queryParams) {
      return deepLink;
    }

    let deepLinkWithQueryParams = deepLink;
    const queryParamsString = Object.keys(queryParams)
      .map((key) => {
        const isValueArray = Array.isArray(queryParams[key]);

        if (isValueArray) {
          return (queryParams[key] as string[]).map((value) => `${key}=${value}`).join('&');
        }

        return `${key}=${queryParams[key]}`;
      })
      .join('&');

    deepLinkWithQueryParams += `?${queryParamsString}`;

    return deepLinkWithQueryParams;
  }

  private constructTrie() {
    this.deepLinkPaths.task.forEach((path) => this.trie.insert(path));
    this.deepLinkPaths.case.forEach((path) => this.trie.insert(path));
    this.deepLinkPaths.employee.forEach((path) => this.trie.insert(path));
    // Uncomment and adjust as needed
    // this.deepLinkPaths.roundOfInvitation.forEach((path) => this.trie.insert(path));
    // this.deepLinkPaths.user.forEach((path) => this.trie.insert(path));
    // this.deepLinkPaths.user.forEach((path) => this.trie.insert(path));
  }
}
