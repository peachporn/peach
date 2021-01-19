import gql from 'graphql-tag';

export const genreCardFragment = gql`
  fragment GenreCard on Genre {
    id
    name
    picture
    category
    kinkiness
  }
`;
