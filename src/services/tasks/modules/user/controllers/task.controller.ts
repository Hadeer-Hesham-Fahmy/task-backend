import { Persona, UserJwtPersona, CustomResponse, UserPermission, UserResourceOperationsEnum, UserResourcesEnum, UserJwtAuthGuard, JwtDecodeGuard } from '@common';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserTasksService } from './task.service';
import { CreateTaskDto } from '../../dto/user/create-task.dto';
import { UpdateTaskDto } from '../../dto/user/update-task.dto';
import { UserJwtDecodeGuard } from 'src/services/authentication/modules/user/controllers/user-auth/guards/user-jwt.guard';
import { UpdateTaskStatusDto } from '../../dto/user/change-task-status.dto';
import { ListTasksQueryDto } from '../../dto/user/list-my-tasks.dto';



@Controller('tasks')
@ApiTags('Task - User')
export class UserTasksController {
  constructor(private userTasksService: UserTasksService) {}
  
  @Post('user/private/tasks')
  @ApiOperation({ summary: 'create a new task' })
  @ApiBearerAuth()
 @UseGuards(UserJwtDecodeGuard)
  @UserPermission({
    resource: UserResourcesEnum.TASKS,
    operation: UserResourceOperationsEnum.CREATE
  })
  async createNewTask(@Persona() userJwt: UserJwtPersona, @Body() body: CreateTaskDto) {
    const result = await this.userTasksService.createNewTask(userJwt._id, body);

    return new CustomResponse().success({
      payload: { data: result },
    });
  }

  @Get('user/private/tasks')
  @ApiOperation({ summary: 'paginate tasks' })
  @ApiBearerAuth()
 @UseGuards(UserJwtDecodeGuard)
  @UserPermission({
    resource: UserResourcesEnum.TASKS,
    operation: UserResourceOperationsEnum.READ
  })
  async paginateTasks(@Persona() userJwt: UserJwtPersona, @Query() query: ListTasksQueryDto) {
    const result = await this.userTasksService.paginateTasks(userJwt._id, query);

    return new CustomResponse().success({
      payload: result,
    });
  }

  @Get('user/private/tasks/:id')
  @ApiOperation({ summary: 'get task by taskId' })
@ApiBearerAuth()
 @UseGuards(UserJwtDecodeGuard)
  @UserPermission({
    resource: UserResourcesEnum.TASKS,
    operation: UserResourceOperationsEnum.READ
  })
  async getTaskByTaskId(@Persona() userJwt: UserJwtPersona, @Param('id') param: string) {
    const result = await this.userTasksService.getTaskByTaskId(userJwt._id, param);

    return new CustomResponse().success({
      payload: { data: result },
    });
  }

  @ApiOperation({ summary: 'update task as manager' })
  @Patch('user/private/tasks/:id')
   @ApiBearerAuth()
 @UseGuards(UserJwtDecodeGuard)
  @UserPermission({
    resource: UserResourcesEnum.TASKS,
    operation: UserResourceOperationsEnum.UPDATE
  })
  async updateSelfTask(
    @Persona() userJwt: UserJwtPersona,
    @Param('id') param: string,
    @Body() body: UpdateTaskDto,
  ) {
    const result = await this.userTasksService.updateTask(userJwt._id, param, body);

    return new CustomResponse().success({
      payload: { data: result },
    });
  }

  @ApiOperation({ summary: 'update task status' })
  @Patch('user/private/tasks/:id/status')
  @ApiBearerAuth()
 @UseGuards(UserJwtDecodeGuard)
  async updateTaskStatus(
    @Persona() userJwt: UserJwtPersona,
    @Param('id') param: string,
    @Body() body: UpdateTaskStatusDto,
  ) {
    const result = await this.userTasksService.updateTaskStatus(userJwt._id, param, body);

    return new CustomResponse().success({
      payload: { data: result },
    });
  }
}
