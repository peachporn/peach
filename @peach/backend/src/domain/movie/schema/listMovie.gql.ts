import { gql } from 'apollo-server';

export const listMovieTypeDefs = gql`
  input MovieFilter {
    title: String
    actresses: [Int!]
    websites: [Int!]
    fetishes: [Int!]
    untouched: Boolean
  }

  enum MoviesSort {
    CREATED_AT_DESC
    RANDOM
  }

  extend type Query {
    movies(limit: Int, skip: Int, filter: MovieFilter, sort: MoviesSort): [Movie!]!
  }
`;
