import { gql } from 'apollo-server';

export const movieTypeDefs = gql`
  type Movie {
    id: Int!
    createdAt: String!
    url: String!

    title: String!
    actresses: [Actress!]!
    # website     Website
    actors: Int!

    volume: Volume
    metaData: MovieMetadata

    screencaps: [String!]!
    coverIndex: Int!
    path: String!

    genres: [GenreDefinition!]!
    fetishes: [Genre!]!
  }

  extend type Query {
    movie(id: Int!): Movie
    randomMovie: Movie!
  }
`;
