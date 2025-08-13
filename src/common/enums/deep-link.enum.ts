export enum DeepLinkModelsEnum {
  TASK = 'tasks',
  EXECUTION = 'executions',
  RECONCILIATION = 'reconciliations',
  CASE = 'cases',
  EMPLOYEE = 'employees',
  MESSAGE = 'messages',

  CONSULTATION = 'consultation',
}

export enum ShareableDeepLinkModelsEnum {
  USERS = 'users',
  POSTS = 'posts',
  PETS = 'pets',
  LOST_POSTS = 'lost-posts',
  FOUND_POSTS = 'found-posts',
  EVENTS = 'events',
  EMPLOYEE = 'employee',
}

export enum UserDeepLinkModelInteractionsEnum {
  COMMENTS = 'comments',
  REPLIES = 'replies',
}

export enum UserDeepLinkSubModelsEnum {
  CASE = 'cases',
  TASK = 'tasks',
  EMPLOYEE = 'employees',
}

export enum EmployeeDeepLinkSubModelsEnum {
  CASE = 'cases',
  TASK = 'tasks',
  EXECUTION = 'executions',
  RECONCILIATION = 'reconciliations',
  EMPLOYEE = 'employees',
  MESSAGE = 'messages',
  CONSULTATION = 'consultations',
}
