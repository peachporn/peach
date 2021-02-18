import { gql } from 'apollo-server';

export const listMovieTypeDefs = gql`
  input MovieFilter {
    fetishes: [Int!]
  }

  enum MoviesSort {
    CREATED_AT_DESC
    RANDOM
  }

  type Query {
    movies(limit: Int, skip: Int, filter: MovieFilter, sort: MoviesSort): [Movie!]!
    movieCount: Int!
  }
`;
