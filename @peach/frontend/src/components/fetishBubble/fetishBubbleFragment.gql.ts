import gql from 'graphql-tag';

export const fetishBubbleFragment = gql`
  fragment FetishBubble on Genre {
    id
    name
    picture
  }
`;
