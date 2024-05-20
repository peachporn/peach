import gql from 'graphql-tag';

export const setupStatusQuery = gql`
  query SetupStatus {
    setupStatus
  }
`;
