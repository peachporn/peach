import { gql } from 'apollo-server';

export const typeDef = gql`
  enum GenreCategory {
    Position
    Location
    Clothing
    Practice
    Film
    Feature
    BodyPart
  }

  type Genre {
    id: Int!
    name: String!
    category: GenreCategory!
    kinkiness: Int!
    picture: String!

    validAsRoot: Boolean!
    linkableParents: [Genre!]!
    linkableChildren: [Genre!]!
  }

  input GenreCreateInput {
    name: String!
    category: GenreCategory!
    kinkiness: Int!
    validAsRoot: Boolean!
  }

  input GenreUpdateInput {
    name: String
    category: GenreCategory
    validAsRoot: Boolean
    kinkiness: Int
  }

  input GenreFilter {
    name: String
    category: GenreCategory
  }

  extend type Mutation {
    updateGenre(genreId: Int!, data: GenreUpdateInput!): Genre
    createGenre(genreInput: GenreCreateInput!): Genre
    addSubgenre(child: Int!, parent: Int!): Genre
    removeSubgenre(child: Int!, parent: Int!): Genre
    deleteGenre(genreId: Int!): Genre
  }

  extend type Query {
    genre(id: Int!): Genre
    genres(filter: GenreFilter, limit: Int, skip: Int): [Genre!]!
    genresCount(filter: GenreFilter): Int!
  }
`;
