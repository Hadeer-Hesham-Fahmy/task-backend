import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PipelineStage, Types } from 'mongoose';

import { getTaskPipeline, getTasksPipeline } from '../../helpers/task.pipeline.helper';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { addPaginationStages, IUserModel, IUserRoleModel, ModelNames, UserRoleEnum } from '@common';
import {
  ITaskModel,

  TaskStatusEnum,
} from '@common/schemas/mongoose/task';

import { errorManager } from '../../shared/config/error.config';
import { CreateTaskDto } from '../../dto/user/create-task.dto';
import { UpdateTaskDto } from '../../dto/user/update-task.dto';
import { UpdateTaskStatusDto } from '../../dto/user/change-task-status.dto';
import { ListTasksQueryDto } from '../../dto/user/list-my-tasks.dto';


@Injectable()
export class UserTasksService {
  constructor(
    @Inject(ModelNames.TASK) private taskModel: ITaskModel,
    @Inject(ModelNames.USER) private userModel: IUserModel, 
    @Inject(ModelNames.USER_ROLE) private userRoleModel: IUserRoleModel, 
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly ALLOWED_STATUS_TRANSITIONS = {
  pending: ['completed', 'canceled'], // from pending you can go to completed or canceled
  completed: [], // once completed, you can't change
  canceled: [] // once canceled, you can't change
};

  async createNewTask(userId: string, body: CreateTaskDto) {
  await this.validateManager(userId);

  this.validateBasicFields(body);

  await this.validateIssuedTo(body.issuedTo);

  await this.validateDependencies(body.dependencies);

  const newTask = new this.taskModel({
    ...body,
    issuedBy: new Types.ObjectId(userId),
  });

  const savedTask = await newTask.save();

  return savedTask;
}

private async validateManager(userId: string) {
  const user = await this.userModel.findById(userId);
  if (!user || user.role.name.en !== UserRoleEnum.MANAGER) {
    throw new UnauthorizedException(errorManager.UNAUTHORIZED);
  }
}

private validateBasicFields(body: CreateTaskDto|  UpdateTaskDto){
  const { title, dueDate } = body;

  if (!title || title.trim() === '') {
    throw new BadRequestException(errorManager.TASK_TITLE_REQUIRED);
  }

  if (dueDate && dueDate < new Date()) {
    throw new ConflictException(errorManager.INVALID_DATE);
  }
}

private async validateIssuedTo(issuedTo?: (string | Types.ObjectId)[]) {
  if (!issuedTo) return;

  if (!Array.isArray(issuedTo)) {
    throw new BadRequestException(errorManager.INVALID_ISSUEDTO_TYPE);
  }

  const uniqueAssignedUsers = Array.from(new Set(issuedTo));
  if (uniqueAssignedUsers.length !== issuedTo.length) {
    throw new BadRequestException(errorManager.DUPLICATE_ASSIGNED_USERS);
  }

  const usersExist = await this.userModel.countDocuments({
    _id: { $in: issuedTo },
    'role.name.en': UserRoleEnum.USER,
  });

  if (usersExist !== issuedTo.length) {
    throw new BadRequestException(errorManager.INVALID_ASSIGNED_USERS);
  }
}

private async validateDependencies(dependencies?: (string | Types.ObjectId)[]) {
  if (!dependencies) return;

  if (!Array.isArray(dependencies)) {
    throw new BadRequestException(errorManager.INVALID_DEPENDENCIES_TYPE);
  }

  const uniqueAssignedTasks = Array.from(new Set(dependencies));
  if (uniqueAssignedTasks.length !== dependencies.length) {
    throw new BadRequestException(errorManager.DUPLICATE_ASSIGNED_TASKS);
  }

  const tasksExist = await this.taskModel.countDocuments({
    _id: { $in: dependencies },
    status: { $ne: TaskStatusEnum.CANCELED },
  });

  if (tasksExist !== dependencies.length) {
    throw new BadRequestException(errorManager.INVALID_ASSIGNED_TASKS);
  }
}


  async paginateTasks(userId: string, query: ListTasksQueryDto) {
   const { page, limit, status, startDate, endDate, assignedUser } = query;

const matchQuery: PipelineStage[] = [
  {
    $match: {
      ...(status && { status }),

      ...(startDate && endDate
        ? { dueDate: { $gte: new Date(startDate), $lte: new Date(endDate) } }
        : startDate
        ? { dueDate: { $gte: new Date(startDate) } }
        : endDate
        ? { dueDate: { $lte: new Date(endDate) } }
        : {}),

       ...(assignedUser && { issuedTo: { $in: [new Types.ObjectId(assignedUser)] } }),

      $and: [
     {
          $expr: {
            $not: { $in: ['$issuedBy', '$issuedTo'] }, // issuedBy not in issuedTo array
          },
        },
        {
          $or: [
{ issuedTo: { $in: [new Types.ObjectId(userId)] } },
            { issuedBy: new Types.ObjectId(userId) },
          ],
        },
      ],
    },
  },
];


    const [data, [{ total = 0 } = {}]] = await Promise.all([
  this.taskModel.aggregate([
    ...matchQuery,
    {
      $sort: {
        _id: -1, // Default sort: newest first
      },
    },
    ...addPaginationStages({ page, limit }),
    ...getTasksPipeline(),
  ]),
  this.taskModel.aggregate([...matchQuery]).count('total'),
]);

const pages = Math.ceil(total / limit);

return { data, total, limit, pages, page };

  }

 async getTaskByTaskId(userId: string, taskId: string) {
  const matchQuery: PipelineStage[] = [
    {
      $match: {
        _id: new Types.ObjectId(taskId), // first match by taskId
        $and: [
          {
            $expr: {
              $not: { $in: ['$issuedBy', '$issuedTo'] }, // issuedBy not in issuedTo array
            },
          },
          {
            $or: [
              { issuedTo: { $in: [new Types.ObjectId(userId)] } }, // user is in issuedTo array
              { issuedBy: new Types.ObjectId(userId) }, // or user issued the task
            ],
          },
        ],
      },
    },
  ];

  const [task] = await this.taskModel.aggregate([
    ...matchQuery,
    ...getTaskPipeline(), // includes dependencies and issuedBy/issuedTo details
  ]);

  if (!task) {
    throw new NotFoundException(errorManager.TASK_NOT_FOUND);
  }

  return task;
}


  async updateTask(userId: string, taskId: string, body: UpdateTaskDto) {
    await this.validateManager(userId);

    const task = await this.taskModel.findById(taskId);
  if (!task) {
    throw new NotFoundException(errorManager.TASK_NOT_FOUND);
  }

    if ('status' in body) {
    throw new BadRequestException(errorManager.STATUS_UPDATE_NOT_ALLOWED_HERE);
  }

  this.validateBasicFields(body);
  await this.validateIssuedTo(body.issuedTo);
  await this.validateDependencies(body.dependencies);

  task.set({ ...body });
  await task.save();

  return task;
  }

 async updateTaskStatus(userId: string, taskId: string, body: UpdateTaskStatusDto) {
  const user = await this.findUserOrThrow(userId);
  const task = await this.findTaskOrThrow(taskId);

  this.ensureUserCanUpdateStatus(user, task);
  this.ensureValidStatusTransition(task.status, body.status);
 if (body.status === TaskStatusEnum.COMPLETED) {
    await this.ensureDependenciesCompleted(task);
  }
  this.applyStatusUpdate(task, body.status);

  return task;
}

private async ensureDependenciesCompleted(task: any) {
  if (!task.dependencies || task.dependencies.length === 0) return;

  const dependencies = await this.taskModel.find({
    _id: { $in: task.dependencies },
  });

  const incomplete = dependencies.filter(dep => dep.status !== TaskStatusEnum.COMPLETED);

  if (incomplete.length > 0) {
    throw new BadRequestException(errorManager.DEPENDENCY_TASKS_NOT_COMPLETED);

  }
}

private async findUserOrThrow(userId: string) {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new NotFoundException(errorManager.USER_NOT_FOUND);
  }
  return user;
}

private async findTaskOrThrow(taskId: string) {
  const task = await this.taskModel.findById(taskId);
  if (!task) {
    throw new NotFoundException(errorManager.TASK_NOT_FOUND);
  }
  return task;
}

private ensureUserCanUpdateStatus(user: any, task: any) {
  if (user.role?.name?.en === UserRoleEnum.USER) {
    const isAssigned = task.issuedTo?.some(
      (issuedId: any) => issuedId.toString() === user._id.toString(),
    );
    if (!isAssigned) {
      throw new UnauthorizedException(errorManager.UNAUTHORIZED);
    }
  }
}

private ensureValidStatusTransition(currentStatus: string, newStatus: string) {
  const allowedNextStatuses = this.ALLOWED_STATUS_TRANSITIONS[currentStatus];
  if (!allowedNextStatuses.includes(newStatus)) {
    throw new BadRequestException(errorManager.INVALID_STATUS_TRANSITION);
   
  }
}

private async applyStatusUpdate(task: any, status: TaskStatusEnum) {
  task.status = status;
  await task.save();
}

}
