import { gql } from 'apollo-boost';

export const settingsQuery = gql`
  query Settings {
    settings {
      language
      inferMovieTitle
      volumes {
        name
        path
      }
    }
  }
`;
