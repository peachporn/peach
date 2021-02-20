import gql from 'graphql-tag';

export const genreActionCardFragment = gql`
  fragment GenreActionCard on Genre {
    id
    name
    picture
    category
    linkableChildren {
      id
      name
    }
  }
`;
