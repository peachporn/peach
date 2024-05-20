import { createGenreResolvers } from './resolver/createGenre';
import { deleteGenreResolvers } from './resolver/deleteGenre';
import { genreResolvers } from './resolver/genre';
import { genreCountResolvers } from './resolver/genreCount';
import { genresResolvers } from './resolver/genres';
import { updateGenreResolvers } from './resolver/updateGenre';
import { createGenreTypeDefs } from './schema/createGenre.gql';
import { deleteGenreTypeDefs } from './schema/deleteGenre.gql';
import { genreTypeDefs } from './schema/genre.gql';
import { genreCountTypeDefs } from './schema/genreCount.gql';
import { genresTypeDefs } from './schema/genres.gql';
import { updateGenreTypeDefs } from './schema/updateGenre.gql';

export const genreDomainTypeDefs = [
  genreTypeDefs,
  genresTypeDefs,
  genreCountTypeDefs,
  updateGenreTypeDefs,
  createGenreTypeDefs,
  deleteGenreTypeDefs,
];

export const genreDomainResolvers = [
  genreResolvers,
  genresResolvers,
  genreCountResolvers,
  updateGenreResolvers,
  createGenreResolvers,
  deleteGenreResolvers,
];
