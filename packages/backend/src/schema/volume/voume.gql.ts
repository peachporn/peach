import { gql } from 'apollo-server';

export const typeDef = gql`
  input VolumeInput {
    name: String!
    path: String!
  }

  input SaveVolumesInput {
    volumes: [VolumeInput!]!
  }

  type Volume {
    name: String!
    path: String!
  }

  extend type Mutation {
    saveVolumes(input: SaveVolumesInput!): [Volume!]!
  }

  extend type Query {
    volumes: [Volume!]!
  }
`;
