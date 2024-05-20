import { scanLibrary, takeScreencapsForAllMovies } from '@peach/tasks';
import { Resolvers } from '../../../generated/resolver-types';

export const settingsTasksResolvers: Resolvers = {
  Mutation: {
    takeAllScreencaps: () => takeScreencapsForAllMovies().then(() => true),
    scanLibrary: () => scanLibrary({}).then(() => true),
  },
};
