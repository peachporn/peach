import gql from 'graphql-tag';

export const websitesListQuery = gql`
  query websitesList($filter: WebsiteFilter, $limit: Int!, $skip: Int!) {
    websites(filter: $filter, limit: $limit, skip: $skip) {
      name
      picture
    }
  }
`;

export const websitesCountQuery = gql`
  query websitesCount {
    websitesCount
  }
`;
