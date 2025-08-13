export enum UserFcmTopicsEnum {
  MARKETING = 'MARKETING',
  ROUND_OF_INVITATION = 'ROUND_OF_INVITATION',
  USER_CREATION = 'USER_CREATION',
  USER_DELETION = 'USER_DELETION',
  USER_BIRTHDAY = 'USER_BIRTHDAY',
}

export const userOnlyTopics = [UserFcmTopicsEnum.USER_CREATION, UserFcmTopicsEnum.USER_DELETION];

export const generalTopics = [UserFcmTopicsEnum.USER_BIRTHDAY];
