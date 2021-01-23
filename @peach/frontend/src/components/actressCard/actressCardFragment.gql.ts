import gql from 'graphql-tag';

export const actressCardFragment = gql`
  fragment ActressCard on Actress {
    id
    name
    picture
  }
`;
