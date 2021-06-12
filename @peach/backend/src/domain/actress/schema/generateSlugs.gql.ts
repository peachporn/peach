import { gql } from 'apollo-server';

export const generateSlugsTypeDefs = gql`
  extend type Mutation {
    generateSlugs: Boolean!
  }
`;
