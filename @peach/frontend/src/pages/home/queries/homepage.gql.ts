import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const homepageQuery = gql`
  query Homepage {
    randomMovies: movies(sort: RANDOM, limit: 10) {
      ...MovieCard
    }
    recentMovies: movies(sort: CREATED_AT_DESC, limit: 10) {
      ...MovieCard
    }
    settings {
      id
      pinnedFetishes {
        name
      }
    }
  }

  ${movieCardFragment}
`;
