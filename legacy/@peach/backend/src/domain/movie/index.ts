import { convertMovieResolvers } from './resolver/convertMovie';

import { createMovieResolvers } from './resolver/createMovie';
import { deleteMovieResolvers } from './resolver/deleteMovie';
import { extractMovieInformationResolvers } from './resolver/extractMovieInformation';
import { genreDefinitionsResolvers } from './resolver/genreDefinitions';
import { movieResolvers } from './resolver/movie';
import { movieCountResolvers } from './resolver/movieCount';
import { movieFiltersResolvers } from './resolver/movieFilters';
import { moviesResolvers } from './resolver/movies';
import { screencapsResolvers } from './resolver/screencaps';
import { updateMovieResolvers } from './resolver/updateMovie';
import { convertMovieTypeDefs } from './schema/convertMovie.gql';
import { createMovieTypeDefs } from './schema/createMovie.gql';
import { deleteMovieTypeDefs } from './schema/deleteMovie.gql';
import { extractMovieInformationTypeDefs } from './schema/extractMovieInformation.gql';
import { genreDefinitionsTypeDef } from './schema/genreDefinitions.gql';
import { movieMetadataTypeDefs } from './schema/metadata.gql';
import { movieTypeDefs } from './schema/movie.gql';
import { movieCountTypeDefs } from './schema/movieCount.gql';
import { movieFiltersTypeDefs } from './schema/movieFilters.gql';
import { moviesTypeDefs } from './schema/movies.gql';
import { screencapsTypeDefs } from './schema/screencaps.gql';
import { updateMovieTypeDefs } from './schema/updateMovie.gql';

export const movieDomainTypeDefs = [
  convertMovieTypeDefs,
  createMovieTypeDefs,
  deleteMovieTypeDefs,
  extractMovieInformationTypeDefs,
  genreDefinitionsTypeDef,
  movieFiltersTypeDefs,
  movieMetadataTypeDefs,
  movieTypeDefs,
  movieCountTypeDefs,
  moviesTypeDefs,
  screencapsTypeDefs,
  updateMovieTypeDefs,
];

export const movieDomainResolvers = [
  convertMovieResolvers,
  createMovieResolvers,
  deleteMovieResolvers,
  extractMovieInformationResolvers,
  genreDefinitionsResolvers,
  movieFiltersResolvers,
  movieResolvers,
  movieCountResolvers,
  moviesResolvers,
  screencapsResolvers,
  updateMovieResolvers,
];
