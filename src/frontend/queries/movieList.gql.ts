import { gql } from 'apollo-boost';

export const movieListQuery = gql`
  query movieList($limit: Int!, $skip: Int!) {
    movies(limit: $limit, skip: $skip) {
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
