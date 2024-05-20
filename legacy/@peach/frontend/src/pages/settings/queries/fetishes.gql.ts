import gql from 'graphql-tag';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';

export const fetishesQuery = gql`
  query Fetishes($name: String!, $limit: Int!) {
    genres(filter: { name: $name, fetish: true }, limit: $limit) {
      genres {
        ...FetishBubble
      }
    }
  }

  ${fetishBubbleFragment}
`;
