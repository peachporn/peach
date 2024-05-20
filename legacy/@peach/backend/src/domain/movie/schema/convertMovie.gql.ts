import { gql } from 'apollo-server';

export const convertMovieTypeDefs = gql`
  extend type Mutation {
    convertMovie(movieId: Int!): Boolean
  }
`;
