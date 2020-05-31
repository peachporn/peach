import { gql } from 'apollo-server';

export const typeDef = gql`
  enum SetupStatus {
    Complete
    NoVolumes
  }

  extend type Query {
    setupStatus: SetupStatus!
  }
`;
