import { gql } from 'apollo-boost';

export const setupStatusQuery = gql`
  query SetupStatus {
    setupStatus
  }
`;
