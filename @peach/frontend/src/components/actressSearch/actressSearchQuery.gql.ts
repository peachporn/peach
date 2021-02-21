import gql from 'graphql-tag';
import { actressCardFragment } from '../actressCard/actressCardFragment.gql';

export const actressSearchQuery = gql`
  query ActressSearch($filter: ActressFilter!, $limit: Int!) {
    actresses(filter: $filter, limit: $limit) {
      ...ActressCard
    }
  }

  ${actressCardFragment}
`;
