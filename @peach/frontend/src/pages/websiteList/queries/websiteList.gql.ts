import gql from 'graphql-tag';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';

export const websiteListQuery = gql`
  query websiteList($filter: WebsiteFilterInput, $limit: Int!, $skip: Int!) {
    websites(filter: $filter, limit: $limit, skip: $skip) {
      websites {
        ...WebsiteCard
      }
      total
    }
  }

  ${websiteCardFragment}
`;
