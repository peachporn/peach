import gql from 'graphql-tag';
import { websiteCardFragment } from '../websiteCard/websiteCardFragment.gql';

export const websiteSearchQuery = gql`
  query WebsiteSearch($filter: WebsiteFilterInput!, $limit: Int!) {
    websites(filter: $filter, limit: $limit) {
      websites {
        ...WebsiteCard
      }
    }
  }

  ${websiteCardFragment}
`;
