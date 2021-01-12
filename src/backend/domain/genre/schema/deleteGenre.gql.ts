import { gql } from 'apollo-server';

export const deleteGenreTypeDefs = gql`
  extend type Mutation {
    deleteGenre(genreId: Int!): Genre
  }
`;
