import gql from 'graphql-tag';

export const settingsFragment = gql`
  fragment Settings on Settings {
    id
    language
    inferMovieTitle
    actressImagePath
    genreImagePath
    screencapPath
    volumes {
      name
      path
    }
    pinnedFetishes {
      id
    }
  }
`;
