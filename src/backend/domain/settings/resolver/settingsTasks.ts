import { scanLibrary } from '../../../../tasks';
import { takeScreencapsForAllMovies } from '../../../../tasks/screencaps';
import { Resolvers } from '../../../generated/resolver-types';

export const settingsTasksResolvers: Resolvers = {
  Mutation: {
    takeAllScreencaps: () => takeScreencapsForAllMovies().then(() => true),
    scanLibrary: () => scanLibrary({}).then(() => true),
  },
};
