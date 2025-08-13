import { CustomError, ErrorType } from '@common';

export const errorManager = {
  TASK_NOT_FOUND: new CustomError({
    localizedMessage: {
      en: 'Task Not Found',
      ar: 'التكليف غير موجود',
    },
    event: 'Not_Found',
    errorType: ErrorType.NOT_FOUND,
  }),
  USER_NOT_FOUND: new CustomError({
    localizedMessage: {
      en: 'User Not Found',
      ar: 'المستخدم غير موجود',
    },
    event: 'Not_Found',
    errorType: ErrorType.NOT_FOUND,
  }),
  INVALID_ORGANISATION: new CustomError({
    localizedMessage: {
      en: 'Organisation is invalid',
      ar: 'المنظمة غير صالح',
    },
    errorType: ErrorType.INVALID,
    event: 'INVALID_ORGANISATION',
  }),

  FILE_EXTENSION_REQUIRED: new CustomError({
    localizedMessage: {
      en: 'File extension is missing',
      ar: 'مطلوب امتداد الملف',
    },
    event: 'FILE_EXTENSION_REQUIRED',
    errorType: ErrorType.WRONG_INPUT,
  }),

  NO_PERMISSIONS_OVER_EMPLOYEE: new CustomError({
    localizedMessage: {
      en: "You don't have permissions over the assignee",
      ar: 'ليس لديك صلاحيات علي الشخص المعين',
    },
    event: 'NO_PERMISSIONS_OVER_EMPLOYEE',
    errorType: ErrorType.FORBIDDEN,
  }),

  NOT_BRANCH_OR_REGION_MANAGER: new CustomError({
    localizedMessage: {
      en: 'Only Region and Branch Managers can view this resource',
      ar: 'يمكن لمدير الفرع و مدير المنطقة  فقط رؤية هذا المصدر',
    },
    event: 'NOT_BRANCH_OR_REGION_MANAGER',
    errorType: ErrorType.FORBIDDEN,
  }),

  EMPLOYEE_NOT_IN_BRANCH: new CustomError({
    localizedMessage: {
      en: 'Employee not in the selected branch',
      ar: 'الموظف ليس بالفرع المختار',
    },
    event: 'EMPLOYEE_NOT_IN_BRANCH',
    errorType: ErrorType.FORBIDDEN,
  }),

  NO_PERMISSION_TO_ASSIGN: new CustomError({
    localizedMessage: {
      en: "You don't have permission to assign employees to tasks",
      ar: 'غير مصرح لك بتعيين اشخاص علي المهام',
    },
    event: 'NO_PERMISSION_TO_ASSIGN',
    errorType: ErrorType.FORBIDDEN,
  }),

  INVALID_DATE: new CustomError({
    localizedMessage: {
      en: 'The selected date has already passed',
      ar: 'التاريخ المختار قد مر بالفعل',
    },
    event: 'INVALID_DATE',
    errorType: ErrorType.CONFLICT,
  }),

  INVALID_ASSIGNED_USERS: new CustomError({
    localizedMessage: {
    en: 'One or more assigned users do not exist.',
    ar: 'أحد أو أكثر من المستخدمين المعينين غير موجود.',
  },
    errorType: ErrorType.INVALID,
    event: 'INVALID_ASSIGNED_USERS',
    error: [
      {
        fieldName: 'issuedTo',
      },
    ],
  }),

    DUPLICATE_ASSIGNED_USERS: new CustomError({
    localizedMessage: {
    en: 'Assigned users contain duplicate values.',
    ar: 'قائمة المستخدمين المعينين تحتوي على قيم مكررة.',
  },
    errorType: ErrorType.WRONG_INPUT,
    event: 'DUPLICATE_ASSIGNED_USERS',
  }),

  INVALID_ASSIGNED_TASKS: new CustomError({
    localizedMessage: {
    en: 'One or more assigned tasks do not exist.',
    ar: 'أحد أو أكثر من المهام المعينة غير موجود.',
  },
    errorType: ErrorType.INVALID,
    event: 'INVALID_ASSIGNED_TASKS',
    error: [
      {
        fieldName: 'issuedTo',
      },
    ],
  }),

 DUPLICATE_ASSIGNED_TASKS: new CustomError({
  localizedMessage: {
    en: 'Assigned tasks contain duplicate values.',
    ar: 'قائمة المهام المعينة تحتوي على قيم مكررة.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'DUPLICATE_ASSIGNED_TASKS',
}),


UNAUTHORIZED: new CustomError({
  localizedMessage: {
    en: 'User is not authorized to perform this action.',
    ar: 'المستخدم غير مخول لأداء هذا الإجراء.',
  },
  errorType: ErrorType.UNAUTHORIZED,
  event: 'UNAUTHORIZED',
}),

TASK_TITLE_REQUIRED: new CustomError({
  localizedMessage: {
    en: 'Task title is required.',
    ar: 'عنوان المهمة مطلوب.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'TASK_TITLE_REQUIRED',
}),

INVALID_ISSUEDTO_TYPE: new CustomError({
  localizedMessage: {
    en: '`issuedTo` must be an array of user IDs.',
    ar: 'حقل "issuedTo" يجب أن يكون مصفوفة من معرفات المستخدمين.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'INVALID_ISSUEDTO_TYPE',
}),

INVALID_DEPENDENCIES_TYPE: new CustomError({
  localizedMessage: {
    en: '`dependencies` must be an array of task IDs.',
    ar: 'حقل "dependencies" يجب أن يكون مصفوفة من معرفات المهام.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'INVALID_DEPENDENCIES_TYPE',
}),
STATUS_UPDATE_NOT_ALLOWED_HERE: new CustomError({
  localizedMessage: {
    en: 'Updating task status is not allowed in this method.',
    ar: 'لا يُسمح بتحديث حالة المهمة في هذه الطريقة.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'STATUS_UPDATE_NOT_ALLOWED_HERE',
}),
INVALID_STATUS_TRANSITION: new CustomError({
  localizedMessage: {
    en: 'You cannot change the task status from the current state to the requested state.',
    ar: 'لا يمكنك تغيير حالة المهمة من الحالة الحالية إلى الحالة المطلوبة.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'INVALID_STATUS_TRANSITION',
}),
DEPENDENCY_TASKS_NOT_COMPLETED: new CustomError({
  localizedMessage: {
    en: 'Cannot complete task. The following dependencies are not completed.',
    ar: 'لا يمكن إكمال المهمة. التبعيات التالية لم تكتمل بعد.',
  },
  errorType: ErrorType.WRONG_INPUT,
  event: 'DEPENDENCY_TASKS_NOT_COMPLETED',
}),


};
