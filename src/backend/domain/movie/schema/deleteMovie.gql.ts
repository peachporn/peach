import { gql } from 'apollo-server';

export const deleteMovieTypeDefs = gql`
  extend type Mutation {
    deleteMovie(movieId: Int!): Movie
  }
`;
