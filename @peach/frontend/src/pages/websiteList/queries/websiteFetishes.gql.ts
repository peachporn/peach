import gql from 'graphql-tag';
import { fetishBubbleFragment } from '../../../components/fetishBubble/fetishBubbleFragment.gql';

export const websiteFetishesQuery = gql`
  query WebsiteFetishes($name: String!, $limit: Int!) {
    genres(filter: { name: $name, fetish: true }, limit: $limit) {
      ...FetishBubble
    }
  }

  ${fetishBubbleFragment}
`;
