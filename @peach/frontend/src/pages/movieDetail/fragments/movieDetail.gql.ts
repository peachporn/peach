import gql from 'graphql-tag';
import { genreActionCardFragment } from '../components/highlightForm/genreActionCard/genreActionCardFragment.gql';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';

export const movieDetailFragment = gql`
  fragment MovieDetail on Movie {
    id
    title
    path
    videoUrl
    website {
      ...WebsiteCard
    }
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
      ...ActressCard
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

  ${actressCardFragment}
  ${websiteCardFragment}
  ${genreActionCardFragment}
  ${fetishBubbleFragment}
`;
