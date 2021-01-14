import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const randomMoviesQuery = gql`
  query RandomMovies($limit: Int = 10) {
    movies(sort: RANDOM, limit: $limit) {
      ...MovieCard
    }
  }

  ${movieCardFragment}
`;
