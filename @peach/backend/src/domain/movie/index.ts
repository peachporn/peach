import { createMovieTypeDefs } from './schema/createMovie.gql';
import { deleteMovieTypeDefs } from './schema/deleteMovie.gql';
import { genreDefinitionsTypeDef } from './schema/genreDefinitions.gql';
import { listMovieTypeDefs } from './schema/listMovie.gql';
import { movieMetadataTypeDefs } from './schema/metadata.gql';
import { movieTypeDefs } from './schema/movie.gql';
import { updateMovieTypeDefs } from './schema/updateMovie.gql';

import { createMovieResolvers } from './resolver/createMovie';
import { deleteMovieResolvers } from './resolver/deleteMovie';
import { genreDefinitionsResolvers } from './resolver/genreDefinitions';
import { listMovieResolvers } from './resolver/listMovie';
import { movieResolvers } from './resolver/movie';
import { screencapsResolvers } from './resolver/screencaps';
import { updateMovieResolvers } from './resolver/updateMovie';
import { screencapsTypeDefs } from './schema/screencaps.gql';

export const movieDomainTypeDefs = [
  createMovieTypeDefs,
  deleteMovieTypeDefs,
  genreDefinitionsTypeDef,
  listMovieTypeDefs,
  movieMetadataTypeDefs,
  movieTypeDefs,
  screencapsTypeDefs,
  updateMovieTypeDefs,
];

export const movieDomainResolvers = [
  createMovieResolvers,
  deleteMovieResolvers,
  genreDefinitionsResolvers,
  listMovieResolvers,
  movieResolvers,
  screencapsResolvers,
  updateMovieResolvers,
];
