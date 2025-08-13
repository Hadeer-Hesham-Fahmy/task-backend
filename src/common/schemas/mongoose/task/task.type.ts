import {
  IsArray,
  IsDate,
  IsEnum,
  IsInstance,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Model, Types } from 'mongoose';
import { TaskStatusEnum } from './task.enum';
import { BaseModel } from '../base/base-schema';
import { TransformObjectId, TransformObjectIds } from '@common/decorators/class-transformer';

export class Task extends BaseModel<Task> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  

  @IsDate()
  dueDate: Date;

  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  issuedBy: Types.ObjectId;

  @IsArray()
  @IsInstance(Types.ObjectId, { each: true })
  @TransformObjectIds()
  issuedTo: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsInstance(Types.ObjectId, { each: true })
  @TransformObjectIds()
  dependencies?: Types.ObjectId[];

  @IsString()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}

export interface ITaskModel extends Model<Task, Record<string, unknown>> {}
