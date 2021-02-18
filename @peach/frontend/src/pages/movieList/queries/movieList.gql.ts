import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const movieListQuery = gql`
  query movieList($limit: Int!, $skip: Int!, $filter: MovieFilter) {
    movies(limit: $limit, skip: $skip, filter: $filter) {
      ...MovieCard
    }
  }

  ${movieCardFragment}
`;

export const movieCountQuery = gql`
  query movieCount {
    movieCount
  }
`;
