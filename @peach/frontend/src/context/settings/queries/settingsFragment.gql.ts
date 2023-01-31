import gql from 'graphql-tag';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';

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
    pinnedFetishes {
      ...FetishBubble
    }
    autoConvertMovies
  }

  ${fetishBubbleFragment}
`;
