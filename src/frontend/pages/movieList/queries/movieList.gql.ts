import gql from 'graphql-tag';

export const movieListQuery = gql`
  query movieList($limit: Int!, $skip: Int!, $filter: MoviesFilter) {
    movies(limit: $limit, skip: $skip, filter: $filter) {
      id
      title
      screencaps {
        src
        index
        cover
      }
    }
  }
`;

export const movieCountQuery = gql`
  query movieCount {
    movieCount
  }
`;
