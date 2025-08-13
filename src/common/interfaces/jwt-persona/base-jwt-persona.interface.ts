export enum PersonaTypeEnum {
  USER = 'user',
  EMPLOYEE = 'employee',
}

export interface BaseJwtPersona {
  _id: string;
  type: PersonaTypeEnum;
  sessionId: string;
  iat: number;
  exp: number;
}
