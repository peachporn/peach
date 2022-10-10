import { gql } from 'apollo-server';

export const listMovieTypeDefs = gql`
  input MovieFilterInput {
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
    movies(limit: Int, skip: Int, filter: MovieFilterInput, sort: MoviesSort): [Movie!]!
  }
`;
