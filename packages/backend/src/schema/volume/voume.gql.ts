import { gql } from 'apollo-server';

export const typeDef = gql`
  input CreateVolumeInput {
    name: String!
    path: String!
  }

  extend type Mutation {
    createVolume(input: CreateVolumeInput!): Boolean
  }
`;
