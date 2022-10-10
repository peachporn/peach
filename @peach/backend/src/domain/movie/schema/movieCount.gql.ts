import { gql } from 'apollo-server';

export const movieCountTypeDefs = gql`
  type MovieCountResponse {
    all: Int!
    untouched: Int!
  }

  type Query {
    movieCount: MovieCountResponse!
  }
`;
