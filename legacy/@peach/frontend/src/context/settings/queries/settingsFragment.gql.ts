import gql from 'graphql-tag';

export const settingsFragment = gql`
  fragment Settings on Settings {
    id
    language
    inferMovieTitle
    libraryPath
    volumes {
      name
      path
    }
    autoConvertMovies
  }
`;
