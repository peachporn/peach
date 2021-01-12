import { genreTypeDefs } from './schema/genre.gql';
import { updateGenreTypeDefs } from './schema/updateGenre.gql';
import { createGenreTypeDefs } from './schema/createGenre.gql';
import { deleteGenreTypeDefs } from './schema/deleteGenre.gql';

import { genreResolvers } from './resolver/genre';
import { updateGenreResolvers } from './resolver/updateGenre';
import { createGenreResolvers } from './resolver/createGenre';
import { deleteGenreResolvers } from './resolver/deleteGenre';

export const genreDomainTypeDefs = [
  genreTypeDefs,
  updateGenreTypeDefs,
  createGenreTypeDefs,
  deleteGenreTypeDefs,
];

export const genreDomainResolvers = [
  genreResolvers,
  updateGenreResolvers,
  createGenreResolvers,
  deleteGenreResolvers,
];
