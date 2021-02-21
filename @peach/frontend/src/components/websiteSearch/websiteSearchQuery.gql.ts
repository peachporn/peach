import gql from 'graphql-tag';
import { websiteCardFragment } from '../websiteCard/websiteCardFragment.gql';

export const websiteSearchQuery = gql`
  query WebsiteSearch($filter: WebsiteFilter!, $limit: Int!) {
    websites(filter: $filter, limit: $limit) {
      ...WebsiteCard
    }
  }

  ${websiteCardFragment}
`;
