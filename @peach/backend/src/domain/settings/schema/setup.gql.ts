import { gql } from 'apollo-server';

export const setupTypeDefs = gql`
  enum SetupStatus {
    Complete
    NoVolumes
  }

  extend type Query {
    setupStatus: SetupStatus!
  }
`;
