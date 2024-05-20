import gql from 'graphql-tag';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';

export const extractMovieInformationMutation = gql`
  fragment WebsiteDetection on WebsiteDetection {
    id
    content {
      ...WebsiteCard
      fetish {
        id
      }
    }
  }

  fragment ExtractedMovieInformation on ExtractedMovieInformation {
    tokens {
      token
      detection
    }
    detections {
      ... on ActressDetection {
        id
        content {
          ...ActressCard
        }
      }
      ... on WebsiteDetection {
        ...WebsiteDetection
      }
    }
  }
  mutation ExtractMovieInformation($movieTitle: String!) {
    extractMovieInformation(movieTitle: $movieTitle) {
      ...ExtractedMovieInformation
    }
  }

  ${actressCardFragment}
  ${websiteCardFragment}
`;
