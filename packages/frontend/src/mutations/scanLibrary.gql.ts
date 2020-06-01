import { gql } from 'apollo-boost';

export const scanLibraryMutation = gql`
  mutation ScanLibrary {
    scanLibrary
  }
`;
