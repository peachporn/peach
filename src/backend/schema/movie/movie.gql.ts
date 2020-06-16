import { gql } from 'apollo-server';

export const typeDef = gql`
  type Movie {
    id: Int!
    createdAt: String!
    title: String!
    url: String!
    # actresses   Actress[]
    # genres      Genre[]
    # highlights  Highlight[]
    # website     Website
    metaData: MovieMetadata
    actors: Int!
    fresh: Boolean!
    volume: Volume
    screencaps: [String!]!
    coverIndex: Int!
    path: String!
  }

  type MovieMetadata {
    quality: Quality!
    format: Format!
    fps: Int!
    durationSeconds: Int!
    minutes: Int!
    seconds: Int!
    sizeInKB: Int!
    sizeInMB: Int!
  }

  enum Quality {
    SD
    HD
    FullHD
    UHD
  }

  enum Format {
    mp4
    wmv
  }

  input MovieUpdateInput {
    cover: Int
  }

  type Query {
    movieList(limit: Int!, skip: Int!): [Movie!]!
    movieCount: Int!
    movie(id: Int!): Movie
  }

  extend type Mutation {
    updateMovie(movieId: Int!, data: MovieUpdateInput!): Movie
  }
`;
