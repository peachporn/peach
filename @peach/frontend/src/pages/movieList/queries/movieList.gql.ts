import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const movieListQuery = gql`
  query movieList($limit: Int!, $skip: Int!, $filter: MovieFilterInput) {
    movies(limit: $limit, skip: $skip, filter: $filter, sort: CREATED_AT_DESC) {
      movies {
        ...MovieCard
      }
      total
    }
  }

  ${movieCardFragment}
`;

export const movieCountQuery = gql`
  query movieCount {
    movieCount {
      all
    }
  }
`;
