import { CustomError, ErrorType } from '@common';

export const errorManager = {
  ROLE_IN_USE: new CustomError({
    localizedMessage: {
      en: 'Role is assigned to an user',
      ar: 'الدور قيد الاستخدام',
    },
    errorType: ErrorType.CONFLICT,
    event: 'ROLE_IN_USE',
  }),

  LAST_USER_CANNOT_BE_DELETED: new CustomError({
    localizedMessage: {
      en: "This is the last user, it can't be deleted.",
      ar: 'هذا هو المسؤول الأخير، لا يمكن حذفه.',
    },
    errorType: ErrorType.CONFLICT,
    event: 'LAST_USER_CANNOT_BE_DELETED',
  }),

  USER_NOT_ACTIVE: new CustomError({
    localizedMessage: {
      en: 'User is not active',
      ar: 'المستخدم غير نشط',
    },
    errorType: ErrorType.INVALID,
    event: 'USER_NOT_ACTIVE',
  }),
  USER_SUSPEND_SELF: new CustomError({
    localizedMessage: {
      en: 'User cannot suspend himself',
      ar: 'لا يمكن للمسؤول تعليق نفسه',
    },
    errorType: ErrorType.CONFLICT,
    event: 'USER_SUSPEND_SELF',
  }),
  USER_NOT_SUSPENDED: new CustomError({
    localizedMessage: {
      en: 'User is not suspended',
      ar: 'المستخدم غير معلق',
    },
    errorType: ErrorType.INVALID,
    event: 'USER_NOT_SUSPENDED',
  }),

  USER_UNSUSPEND_SELF: new CustomError({
    localizedMessage: {
      en: 'User cannot unsuspend himself',
      ar: 'لا يمكن للمسؤول إلغاء تعليق نفسه',
    },
    errorType: ErrorType.CONFLICT,
    event: 'USER_UNSUSPEND_SELF',
  }),
  USER_DELETE_SELF: new CustomError({
    localizedMessage: {
      en: 'User cannot delete himself',
      ar: 'لا يمكن للمسؤول حذف نفسه',
    },
    errorType: ErrorType.CONFLICT,
    event: 'USER_DELETE_SELF',
  }),
  ROLE_NOT_FOUND: new CustomError({
    localizedMessage: {
      en: 'Role not found',
      ar: 'الدور غير موجود',
    },
    errorType: ErrorType.NOT_FOUND,
    event: 'ROLE_NOT_FOUND',
  }),
  ROLE_ALREADY_EXISTS: new CustomError({
    localizedMessage: {
      en: 'Role already exists',
      ar: 'الدور موجود بالفعل',
    },
    errorType: ErrorType.CONFLICT,
    event: 'ROLE_ALREADY_EXISTS',
  }),
  USER_EMAIL_EXISTS: new CustomError({
    localizedMessage: {
      en: 'Email already exists',
      ar: 'البريد الإلكتروني موجود بالفعل',
    },
    errorType: ErrorType.CONFLICT,
    event: 'USER_EMAIL_EXISTS',
  }),
  USER_ROLE_NOT_FOUND: new CustomError({
    localizedMessage: {
      en: 'User role not found',
      ar: 'الدور غير موجود',
    },
    errorType: ErrorType.NOT_FOUND,
    event: 'USER_ROLE_NOT_FOUND',
  }),
  USER_NOT_FOUND: new CustomError({
    localizedMessage: {
      en: 'User not found',
      ar: 'المستخدم غير موجود',
    },
    event: 'USER_NOT_FOUND',
    errorType: ErrorType.NOT_FOUND,
  }),

  FILE_EXTENSION_REQUIRED: new CustomError({
    localizedMessage: {
      en: 'File extension is missing',
      ar: 'مطلوب امتداد الملف',
    },
    event: 'FILE_EXTENSION_REQUIRED',
    errorType: ErrorType.WRONG_INPUT,
  }),
};
