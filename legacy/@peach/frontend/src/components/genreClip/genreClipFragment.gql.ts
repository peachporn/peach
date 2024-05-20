import gql from 'graphql-tag';

export const genreClipFragment = gql`
  fragment GenreClip on Genre {
    id
    name
    category
    picture
  }
`;
