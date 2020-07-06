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

    validAsRoot: Boolean!
    linkableParents: [Genre!]!
  }

  input GenreCreateInput {
    name: String!
    category: GenreCategory!
    kinkiness: Int!
    validAsRoot: Boolean!
  }

  input GenreFilter {
    name: String
    category: GenreCategory
  }

  extend type Mutation {
    createGenre(genreInput: GenreCreateInput!): Genre
    addLinkableParent(child: Int!, parent: Int!): Genre
    removeLinkableParent(child: Int!, parent: Int!): Genre
  }

  extend type Query {
    genres(filter: GenreFilter, limit: Int, skip: Int): [Genre!]!
    genresCount(filter: GenreFilter): Int!
  }
`;
