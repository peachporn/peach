import { gql } from 'apollo-boost';

export const randomMovieQuery = gql`
  query randomMovie {
    randomMovie {
      id
      title
      screencaps
      coverIndex
    }
  }
`;
