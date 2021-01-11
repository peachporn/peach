import { gql } from 'apollo-boost';

export const movieListQuery = gql`
  query movieList($limit: Int!, $skip: Int!, $filter: MoviesFilter) {
    movies(limit: $limit, skip: $skip, filter: $filter) {
      id
      title
      fresh
      screencaps
      coverIndex
    }
  }
`;

export const movieCountQuery = gql`
  query movieCount {
    movieCount
  }
`;
