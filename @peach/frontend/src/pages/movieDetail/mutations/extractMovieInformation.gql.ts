import gql from 'graphql-tag';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';

export const extractMovieInformationMutation = gql`
  mutation ExtractMovieInformation($movieTitle: String!) {
    extractMovieInformation(movieTitle: $movieTitle) {
      actresses {
        ...ActressCard
      }
      website {
        ...WebsiteCard
      }
    }
  }

  ${actressCardFragment}
  ${websiteCardFragment}
`;
