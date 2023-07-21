import { gql } from 'apollo-server';

export const moviesTypeDefs = gql`
  input MoviePerformerInput {
    equipment: [EquipmentInput!]
  }

  input MovieFilterInput {
    title: String
    actresses: [Int!]
    websites: [Int!]
    fetishes: [Int!]
    untouched: Boolean
    constellation: [MoviePerformerInput!]
  }

  enum MoviesSort {
    CREATED_AT_DESC
    RANDOM
  }

  type MoviesResponse {
    movies: [Movie!]!
    total: Int!
  }

  extend type Query {
    movies(limit: Int, skip: Int, filter: MovieFilterInput, sort: MoviesSort): MoviesResponse!
  }
`;
