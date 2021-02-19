import { gql } from 'apollo-server';

export const updateGenreTypeDefs = gql`
  input UpdateGenreInput {
    name: String
    category: GenreCategory
    validAsRoot: Boolean
    validAsFetish: Boolean
    kinkiness: Int
    linkableChildren: [Int!]
  }

  extend type Mutation {
    updateGenre(genreId: Int!, data: UpdateGenreInput!): Genre
  }
`;
