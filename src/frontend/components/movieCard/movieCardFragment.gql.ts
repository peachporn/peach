import gql from 'graphql-tag';

export const movieCardFragment = gql`
  fragment MovieCard on Movie {
    id
    url
    title
    coverPicture {
      src
    }
  }
`;
