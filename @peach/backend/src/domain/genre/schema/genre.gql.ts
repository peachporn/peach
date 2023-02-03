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

    fetishMovies: [Movie!]
    movies: [Movie!]
  }

  extend type Query {
    genre(id: Int!): Genre
  }
`;
