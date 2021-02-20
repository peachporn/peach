import gql from 'graphql-tag';
import { genreActionCardFragment } from '../components/genreForm/genreActionCard/genreActionCardFragment.gql';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';

export const movieDetailFragment = gql`
  fragment MovieDetail on Movie {
    id
    title
    path
    videoUrl
    screencaps {
      src
      cover
      index
    }
    cover
    volume {
      name
    }
    actresses {
      id
      name
      picture
    }
    metaData {
      durationSeconds
      sizeInMB
      minutes
      seconds
      quality
      format
      fps
    }
    genres {
      timeStart
      genre {
        parent {
          ...GenreActionCard
        }
        children {
          ...GenreActionCard
        }
      }
    }
    fetishes {
      ...FetishBubble
    }
  }

  ${genreActionCardFragment}
  ${fetishBubbleFragment}
`;
