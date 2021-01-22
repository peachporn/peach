import gql from 'graphql-tag';

export const actressesListQuery = gql`
  query actressesList($filter: ActressFilter, $limit: Int!, $skip: Int!) {
    actresses(filter: $filter, limit: $limit, skip: $skip) {
      id
      name
      picture
    }
  }
`;

export const actressesCountQuery = gql`
  query actressesCount {
    actressesCount
  }
`;
