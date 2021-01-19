import { gql } from 'apollo-server';

export const genreTypeDefs = gql`
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
    validAsFetish: Boolean!
    linkableParents: [Genre!]!
    linkableChildren: [Genre!]!
  }

  input GenreFilter {
    name: String
    fetish: Boolean
    minKinkiness: Int
    category: GenreCategory
  }

  extend type Query {
    genre(id: Int!): Genre
    genres(filter: GenreFilter, limit: Int, skip: Int): [Genre!]!
    genresCount(filter: GenreFilter): Int!
  }
`;
