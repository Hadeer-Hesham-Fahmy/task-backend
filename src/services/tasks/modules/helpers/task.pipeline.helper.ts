import { PipelineStage } from 'mongoose';

export function getTaskPipeline(): PipelineStage[] {
  return [
    {
      $lookup: {
        from: 'users',
        let: { userId: '$issuedBy' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', { $ifNull: ['$$userId', null] }],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              profilePictureUrl: 1,
            },
          },
        ],
        as: 'issuedBy',
      },
    },
    {
      $unwind: { path: '$issuedBy', preserveNullAndEmptyArrays: true },
    },

    {
      $lookup: {
        from: 'users',
        localField: 'issuedTo',
        foreignField: '_id',
        as: 'issuedTo',
      },
    },

    // dependencies details
    {
      $lookup: {
        from: 'tasks', // self-collection lookup
        localField: 'dependencies',
        foreignField: '_id',
        as: 'dependencies',
      },
    },

    // optional: only select certain fields from dependencies
    {
      $addFields: {
        dependencies: {
          $map: {
            input: '$dependencies',
            as: 'dep',
            in: {
              _id: '$$dep._id',
              title: '$$dep.title',
              status: '$$dep.status',
              dueDate: '$$dep.dueDate',
            },
          },
        },
      },
    },

    {
      $project: {
        title: 1,
        description: 1,

        dueDate: 1,
        issuedBy: 1,
        'issuedTo._id': 1,
        'issuedTo.name': 1,
        'issuedTo.email': 1,
        dependencies: 1,
        createdAt: 1,
        status: 1,
      },
    },
  ];
}

export function getTasksPipeline(): PipelineStage[] {
  return [
    {
      $lookup: {
        from: 'users',
        let: { userId: '$issuedBy' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', { $ifNull: ['$$userId', null] }],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: 'issuedBy',
      },
    },
    {
      $unwind: { path: '$issuedBy', preserveNullAndEmptyArrays: true },
    },

    {
      $lookup: {
        from: 'users',
        localField: 'issuedTo',
        foreignField: '_id',
        as: 'issuedTo',
      },
    },

    {
      $project: {
        title: 1,
        description: 1,
        dueDate: 1,
        issuedBy: 1,
        'issuedTo._id': 1,
        'issuedTo.name': 1,
        createdAt: 1,
        status: 1,
      },
    },
  ];
}
