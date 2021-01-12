import { Resolvers } from '../../../generated/resolver-types';
import { transformTask } from '../transformer/task';

export const tasksResolvers: Resolvers = {
  Query: {
    tasks: (_parent, _args, { prisma }) =>
      prisma.task.findMany().then(tasks => tasks.map(transformTask)),
  },
  Mutation: {
    restartTask: (_parent, { taskId }, { prisma }) =>
      prisma.task
        .update({ where: { id: taskId }, data: { status: 'PENDING' } })
        .then(transformTask),

    restartTasks: (_parent, { taskIds }, { prisma }) =>
      prisma.task
        .updateMany({ where: { id: { in: taskIds } }, data: { status: 'PENDING' } })
        .then(tasks => tasks.count),

    cancelTasks: (_parent, { taskIds }, { prisma }) =>
      prisma.task.deleteMany({ where: { id: { in: taskIds } } }).then(tasks => tasks.count),

    cancelTask: (_parent, { taskId }, { prisma }) =>
      prisma.task
        .delete({ where: { id: taskId } })
        .then(() => true)
        .catch(() => false),
  },
};
