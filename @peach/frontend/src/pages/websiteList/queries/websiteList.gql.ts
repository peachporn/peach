import gql from 'graphql-tag';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';

export const websitesListQuery = gql`
  query websitesList($filter: WebsiteFilter, $limit: Int!, $skip: Int!) {
    websites(filter: $filter, limit: $limit, skip: $skip) {
      ...WebsiteCard
    }
  }

  ${websiteCardFragment}
`;

export const websitesCountQuery = gql`
  query websitesCount {
    websitesCount
  }
`;
