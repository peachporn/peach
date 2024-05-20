import gql from 'graphql-tag';

export const taskFragment = gql`
  fragment Task on Task {
    id
    status
    statusMessage
    category
    parameters
  }
`;
