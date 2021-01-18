import { tasksTypeDefs } from './schema/tasks.gql';

import { tasksResolvers } from './resolver/tasks';

export const tasksDomainTypeDefs = [tasksTypeDefs];

export const tasksDomainResolvers = [tasksResolvers];
