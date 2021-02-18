import gql from 'graphql-tag';
import { fetishBubbleFragment } from '../fetishBubble/fetishBubbleFragment.gql';

export const genreSearchQuery = gql`
  query GenreSearch($filter: GenreFilter!, $limit: Int!) {
    genres(filter: $filter, limit: $limit) {
      ...FetishBubble
    }
  }

  ${fetishBubbleFragment}
`;
