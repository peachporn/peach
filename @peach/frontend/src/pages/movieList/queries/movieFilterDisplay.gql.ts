import gql from 'graphql-tag';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';
import { genreCardFragment } from '../../../components/genreCard/genreCardFragment.gql';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';

export const movieFilterDisplayQuery = gql`
  query movieFilterDisplay(
    $genres: [Int!]
    $genreLimit: Int!
    $actresses: [Int!]
    $actressLimit: Int!
    $websites: [Int!]
    $websiteLimit: Int!
  ) {
    genres(filter: { ids: $genres }, limit: $genreLimit) {
      genres {
        ...GenreCard
      }
    }
    actresses(filter: { ids: $actresses }, limit: $actressLimit) {
      actresses {
        ...ActressCard
      }
    }
    websites(filter: { ids: $websites }, limit: $websiteLimit) {
      websites {
        ...WebsiteCard
      }
    }
  }

  ${genreCardFragment}
  ${actressCardFragment}
  ${websiteCardFragment}
`;
