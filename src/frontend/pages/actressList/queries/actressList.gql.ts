import gql from 'graphql-tag';

export const actressesListQuery = gql`
  query actressesList($limit: Int!, $skip: Int!) {
    actresses(limit: $limit, skip: $skip) {
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
