import { typeDef as actress } from './actress/actress.gql';
import { typeDef as createMovie } from './movie/createMovie.gql';
import { typeDef as movie } from './movie/movie.gql';
import { typeDef as settings } from './settings/settings.gql';
import { typeDef as setup } from './settings/setup.gql';
import { typeDef as volume } from './volume/volume.gql';
import { typeDef as tasks } from './tasks/tasks.gql';
import { typeDef as geoLocation } from './scalars/geolocation.gql';
import { typeDef as genre } from './genre/genre.gql';

export const typeDefs = [
  geoLocation,
  createMovie,
  movie,
  settings,
  setup,
  volume,
  actress,
  tasks,
  genre,
];
