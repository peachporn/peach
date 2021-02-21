import { gql } from 'apollo-server';

export const updateMovieTypeDefs = gql`
  input UpdateMovieInput {
    title: String
    fetishes: [Int!]
    website: Int
    actresses: [Int!]
    cover: Int
  }

  extend type Mutation {
    updateMovie(movieId: Int!, data: UpdateMovieInput!): Movie
  }
`;
