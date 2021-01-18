import { gql } from 'apollo-server';

export const updateGenreTypeDefs = gql`
  input UpdateGenreInput {
    name: String
    category: GenreCategory
    validAsRoot: Boolean
    kinkiness: Int
  }

  extend type Mutation {
    updateGenre(genreId: Int!, data: UpdateGenreInput!): Genre

    addSubgenre(child: Int!, parent: Int!): Genre
    removeSubgenre(child: Int!, parent: Int!): Genre
  }
`;
