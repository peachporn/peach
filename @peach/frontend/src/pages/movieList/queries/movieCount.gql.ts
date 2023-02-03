import gql from 'graphql-tag';

export const movieCountQuery = gql`
  query movieCount {
    movieCount {
      all
    }
  }
`;
