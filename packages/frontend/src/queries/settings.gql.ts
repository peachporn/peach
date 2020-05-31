import { gql } from 'apollo-boost';

export const settingsQuery = gql`
  query Settings {
    settings {
      language
      volumes {
        name
        path
      }
    }
  }
`;
