import gql from 'graphql-tag';

export const scanLibraryMutation = gql`
  mutation ScanLibrary {
    scanLibrary
  }
`;
