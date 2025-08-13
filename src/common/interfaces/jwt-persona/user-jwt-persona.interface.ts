import { UserPermissions } from '@common/schemas/mongoose/user/user-permissions';
import { BaseJwtPersona, PersonaTypeEnum } from './base-jwt-persona.interface';
import { LocalizedText } from '@common/schemas/mongoose/common/localized-text';

export interface UserJwtPersona extends BaseJwtPersona {
  type: PersonaTypeEnum.USER;
  name: LocalizedText;
  email: string;
  permissions: UserPermissions;
}
