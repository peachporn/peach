import gql from 'graphql-tag';

export const tasksQuery = gql`
  query tasks {
    tasks {
      id
      status
      statusMessage
      category
      parameters
    }
  }
`;
