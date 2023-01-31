import gql from 'graphql-tag';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const homepageQuery = gql`
  query Homepage {
    movieCount {
      all
      untouched
    }
    randomMovies: movies(sort: RANDOM, limit: 10) {
      movies {
        ...MovieCard
      }
    }
    recentMovies: movies(sort: CREATED_AT_DESC, limit: 10) {
      movies {
        ...MovieCard
      }
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
