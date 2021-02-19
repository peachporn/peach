import gql from 'graphql-tag';
import { fetishBubbleFragment } from '../fetishBubble/fetishBubbleFragment.gql';

export const websiteCardFragment = gql`
  fragment WebsiteCard on Website {
    id
    name
    url
    picture
    fetish {
      ...FetishBubble
    }
  }

  ${fetishBubbleFragment}
`;
