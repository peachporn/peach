import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';

export const homepageQuery = gql`
  query Homepage {
    movieCount
    randomMovies: movies(sort: RANDOM, limit: 10) {
      ...MovieCard
    }
    recentMovies: movies(sort: CREATED_AT_DESC, limit: 10) {
      ...MovieCard
    }
    settings {
      id
      pinnedFetishes {
        ...FetishBubble
      }
    }
  }

  ${movieCardFragment}
  ${fetishBubbleFragment}
`;
