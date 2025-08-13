import { TaskStatusEnum } from '@common/schemas/mongoose/task';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { BasePaginationQuery } from 'src/common/dtos/base-pagination.dto';



export class ListTasksQueryDto extends BasePaginationQuery {
 @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  assignedUser?: string; // userId
}
