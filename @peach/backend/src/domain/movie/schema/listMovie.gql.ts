import { gql } from 'apollo-server';

export const listMovieTypeDefs = gql`
  input MoviesFilter {
    fetishes: [Int!]
  }

  enum MoviesSort {
    CREATED_AT_DESC
    RANDOM
  }

  type Query {
    movies(limit: Int, skip: Int, filter: MoviesFilter, sort: MoviesSort): [Movie!]!
    movieCount: Int!
  }
`;
