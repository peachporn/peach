import { Resolvers } from '../../generated/resolver-types';
import { transformTask } from '../../transformers/tasks';

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
    cancelTask: (_parent, { taskId }, { prisma }) =>
      prisma.task
        .delete({ where: { id: taskId } })
        .then(() => true)
        .catch(() => false),
  },
};
