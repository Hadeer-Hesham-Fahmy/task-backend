import bcrypt from 'bcrypt';
import { UserRoleEnum, UserRoleEnumAr } from '@common/schemas/mongoose/user/user-role/user-role.enum';
import { IUserRoleModel } from '@common/schemas/mongoose/user/user-role/user-role.type';
import { IUserModel } from '@common/schemas/mongoose/user/user.type';
import { Logger } from '@nestjs/common';

const logger = new Logger('SeedDefaultUsers');
/**
 * Dynamically initializes a role and associated default user.
 * - Finds existing role, or creates it if missing.
 * - Projects role into embedded document format.
 * - Finds existing user, or creates them if missing.
 */
async function initializeRoleAndUser({
  userModel,
  userRoleModel,
  roleNameEn,
  roleNameAr,
  permissions,
  userEmail,
  userNameEn,
  userNameAr,
  plainPassword,
}: {
  userModel: IUserModel;
  userRoleModel: IUserRoleModel;
  roleNameEn: string;
  roleNameAr: string;
  permissions: Record<string, any>;
  userEmail: string;
  userNameEn: string;
  userNameAr: string;
  plainPassword: string;
}) {
  // 1️⃣ Ensure Role exists
  let role = await userRoleModel.findOne({ 'name.en': roleNameEn });
  if (!role) {
    role = await userRoleModel.create({
      name: { en: roleNameEn, ar: roleNameAr },
      permissions,
    });
     logger.log(`✅ ${roleNameEn} Role initialized`);
  } else {
    logger.warn(`⚠️ ${roleNameEn} Role already exists`);
  }

  // ✅ Project the role for embedding into user document
  const roleDoc = {
    _id: role._id,
    name: role.name,
    permissions: role.permissions,
  };

  // 2️⃣ Ensure User exists
  const existingUser = await userModel.findOne({ email: userEmail });
  if (!existingUser) {

    await userModel.create({
      name: { en: userNameEn, ar: userNameAr },
      email: userEmail,
      password: plainPassword,
      role: roleDoc,
    });

    logger.log(`✅ ${roleNameEn} ${userNameEn} initialized`);
  } else {
    logger.warn(`⚠️ ${roleNameEn} ${userNameEn} already exists`);
  }
}

export async function seedDefaultUsers(
  userModel: IUserModel,
  userRoleModel: IUserRoleModel,
  {
    manager,
    user,
    secondaryUser
  }: {
    manager: { email: string; nameEn: string; nameAr: string; password: string };
    user: { email: string; nameEn: string; nameAr: string; password: string };
    secondaryUser: { email: string; nameEn: string; nameAr: string; password: string };
  },
) {
  await initializeRoleAndUser({
    userModel,
    userRoleModel,
    roleNameEn: UserRoleEnum.MANAGER,
    roleNameAr: UserRoleEnumAr.MANAGER,
    permissions: { tasks: { create: true, read: true, update: true, delete: true } },
    userEmail: manager.email,
    userNameEn: manager.nameEn,
    userNameAr: manager.nameAr,
    plainPassword: manager.password,
  });

  await initializeRoleAndUser({
    userModel,
    userRoleModel,
    roleNameEn: UserRoleEnum.USER,
    roleNameAr: UserRoleEnumAr.USER,
    permissions: { tasks: { create: false, read: true, update: false, delete: false } },
    userEmail: user.email,
    userNameEn: user.nameEn,
    userNameAr: user.nameAr,
    plainPassword: user.password,
  });

  await initializeRoleAndUser({
    userModel,
    userRoleModel,
    roleNameEn: UserRoleEnum.USER,
    roleNameAr: UserRoleEnumAr.USER,
    permissions: { tasks: { create: false, read: true, update: false, delete: false } },
    userEmail: secondaryUser.email,
    userNameEn: secondaryUser.nameEn,
    userNameAr: secondaryUser.nameAr,
    plainPassword: secondaryUser.password,
  });
}