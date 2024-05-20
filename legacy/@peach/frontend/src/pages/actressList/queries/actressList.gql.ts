import gql from 'graphql-tag';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';

export const actressListQuery = gql`
  query actressList($filter: ActressFilterInput, $limit: Int!, $skip: Int!) {
    actresses(filter: $filter, limit: $limit, skip: $skip) {
      actresses {
        ...ActressCard
      }
      total
    }
  }

  ${actressCardFragment}
`;
