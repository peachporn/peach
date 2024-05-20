import gql from 'graphql-tag';
import { settingsFragment } from './settingsFragment.gql';

export const settingsQuery = gql`
  query Settings {
    settings {
      ...Settings
    }
  }

  ${settingsFragment}
`;

export const pathExistsQuery = gql`
  query PathExists($path: String!) {
    pathExists(path: $path)
  }
`;
