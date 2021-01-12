import { gql } from 'apollo-server';

export const createGenreTypeDefs = gql`
  input GenreCreateInput {
    name: String!
    category: GenreCategory!
    kinkiness: Int!
    validAsRoot: Boolean!
    validAsFetish: Boolean!
  }

  extend type Mutation {
    createGenre(genreInput: GenreCreateInput!): Genre
  }
`;
