import { TransformObjectId, TransformObjectIds } from '@common';
import { Task } from '@common/schemas/mongoose/task';
import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInstance, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTaskDto extends PartialType(
  PickType(Task, ['title', 'dueDate', 'issuedTo', 'description',
  'dependencies'
  ] as const),
) {


  @ApiPropertyOptional({
    example: ['689cf17b63e1c01b9f13d815'],
  })
       @IsOptional()

  @IsArray()
  @IsInstance(Types.ObjectId, { each: true })
  @TransformObjectIds()
  issuedTo?: Types.ObjectId[];

  
 @ApiPropertyOptional({
    example: ['689cf98b53475ab90646d01a'],
  })
       @IsOptional()
  @IsArray()
  @IsInstance(Types.ObjectId, { each: true })
  @TransformObjectIds()
  dependencies?: Types.ObjectId[];
}
