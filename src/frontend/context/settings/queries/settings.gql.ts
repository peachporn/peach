import gql from 'graphql-tag';

export const settingsQuery = gql`
  query Settings {
    settings {
      language
      inferMovieTitle
      actressImagePath
      genreImagePath
      screencapPath
      volumes {
        name
        path
      }
    }
  }
`;

export const pathExistsQuery = gql`
  query PathExists($path: String!) {
    pathExists(path: $path)
  }
`;

export const tasksQuery = gql`
  query tasks {
    tasks {
      id
      status
      statusMessage
      category
      parameters
    }
  }
`;
