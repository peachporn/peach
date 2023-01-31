import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const pinnedFetishesQuery = gql`
  query PinnedFetishes($fetishIds: [Int!]!) {
    movies(sort: RANDOM, filter: { fetishes: $fetishIds }, limit: 10) {
      movies {
        ...MovieCard
      }
    }
  }

  ${movieCardFragment}
`;
