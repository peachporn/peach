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
    coverImage: String!
  }

  type MovieMetadata {
    quality: Quality!
    format: Format!
    fps: Int!
    minutes: Int!
    seconds: Int!
    size: Int!
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
    movies: [Movie!]!
  }
`;
