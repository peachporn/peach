import gql from 'graphql-tag';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';

export const actressesListQuery = gql`
  query actressesList($filter: ActressFilter, $limit: Int!, $skip: Int!) {
    actresses(filter: $filter, limit: $limit, skip: $skip) {
      ...ActressCard
    }
  }

  ${actressCardFragment}
`;

export const actressesCountQuery = gql`
  query actressesCount {
    actressesCount
  }
`;
