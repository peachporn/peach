import { actressResolvers } from './actress';
import { volumeResolvers } from './volume';
import { settingsResolvers } from './settings';
import { movieResolvers } from './movie';
import { setupResolvers } from './setup';
import { tasksResolvers } from './tasks';
import { genreResolvers } from './genre';

export const resolvers = [
  volumeResolvers,
  settingsResolvers,
  movieResolvers,
  setupResolvers,
  actressResolvers,
  tasksResolvers,
  genreResolvers,
];
