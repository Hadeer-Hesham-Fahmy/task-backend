/*
  This file contains mappers for multiple user modules.
  The purpose of these mappers is to map user modules to notification types and fcm topics and have a single source of truth.
  Which in this case will either be the notification type or the fcm topic, regardless of whether the user module is being used for permissions or subscriptions.
*/

// export function userSubscriptionToPermissionMapper(subscription: UserUpdateSubscriptionsEnum) {
//   const userSubscriptionToPermissionMapper = {
//     [UserUpdateSubscriptionsEnum.APPOINTMENT_UPDATES]: UserResourcesEnum.APPOINTMENTS,
//   };

//   return userSubscriptionToPermissionMapper[subscription];
// }

// export function userPermissionToNotificationTypeMapper(resource: UserResourcesEnum) {
//   const userPermissionToNotificationTypeMapper = {
//     [UserResourcesEnum.APPOINTMENTS]: UserNotificationTypeEnum.NEW_APPOINTMENT,
//   };

//   return userPermissionToNotificationTypeMapper[resource];
// }

// export function userSubscriptionToFcmTopicMapper(subscription: UserUpdateSubscriptionsEnum) {
//   const userSubscriptionToFcmTopicMapper = {
//     [UserUpdateSubscriptionsEnum.APPOINTMENT_UPDATES]: UserFcmTopicsEnum.APPOINTMENTS,
//   };

//   return userSubscriptionToFcmTopicMapper[subscription];
// }

// export function userPermissionToFcmTopicMapper(resource: UserResourcesEnum) {
//   const userPermissionToFcmTopicMapper = {
//     [UserResourcesEnum.APPOINTMENTS]: UserFcmTopicsEnum.APPOINTMENTS,
//   };

//   return userPermissionToFcmTopicMapper[resource];
// }
