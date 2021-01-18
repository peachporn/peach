import { gql } from 'apollo-server';

export const movieTypeDefs = gql`
  type Movie {
    id: Int!
    createdAt: String!

    title: String!
    actresses: [Actress!]!
    # website     Website
    actors: Int!

    volume: Volume
    metaData: MovieMetadata
    path: String!

    screencaps: [Screencap!]!
    coverPicture: Screencap
    cover: Int!

    genres: [GenreDefinition!]!
    fetishes: [Genre!]!
  }

  extend type Query {
    movie(id: Int!): Movie
  }
`;
