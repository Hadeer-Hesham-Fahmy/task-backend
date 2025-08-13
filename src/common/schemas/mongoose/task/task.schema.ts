import { Connection, Schema } from 'mongoose';
import { TaskStatusEnum } from './task.enum';
import { ITaskModel, Task } from './task.type';
import { ModelNames } from '@common/constants';
import { validateSchema } from '@common/helpers/mongoose-schema-validation.helper';
import { BaseSchema } from '../base/base-schema';

export const TaskSchema = new Schema<Task, ITaskModel>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    issuedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelNames.USER,
    },

    issuedTo: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: ModelNames.USER,
      },
    ],

   
dependencies: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelNames.TASK,
      },
    ],
 

    status: {
      type: String,
      required: false,
      enum: TaskStatusEnum,
      default: TaskStatusEnum.PENDING,
    },

 

    ...BaseSchema,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  },
);

export function taskSchemaFactory(connection: Connection) {
  TaskSchema.index({ dueDate: 1 });

  TaskSchema.pre('validate', async function () {
    await validateSchema(this, Task);
  });

  const taskModel = connection.model(ModelNames.TASK, TaskSchema);

  return taskModel;
}
