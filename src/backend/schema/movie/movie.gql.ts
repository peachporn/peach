import { gql } from 'apollo-server';

export const typeDef = gql`
  type Movie {
    id: Int!
    createdAt: String!
    title: String!
    # actresses   Actress[]
    # genres      Genre[]
    # highlights  Highlight[]
    # website     Website
    metaData: MovieMetadata
    actors: Int!
    fresh: Boolean!
    screencaps: [String!]!
    coverIndex: Int!
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
    MP4
    WMV
  }

  type Query {
    movieList(limit: Int!, skip: Int!): [Movie!]!
    movieCount: Int!
  }
`;
