import gql from 'graphql-tag';

export const movieCardFragment = gql`
  fragment MovieCard on Movie {
    id
    title
    coverPicture {
      src
    }
  }
`;
