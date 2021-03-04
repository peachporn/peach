import gql from 'graphql-tag';
import { actressCardFragment } from '../../../components/actressCard/actressCardFragment.gql';
import { websiteCardFragment } from '../../../components/websiteCard/websiteCardFragment.gql';
import { genreCardFragment } from '../../../components/genreCard/genreCardFragment.gql';

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
      ...GenreCard
    }
    actresses(filter: { ids: $actresses }, limit: $actressLimit) {
      ...ActressCard
    }
    websites(filter: { ids: $websites }, limit: $websiteLimit) {
      ...WebsiteCard
    }
  }

  ${genreCardFragment}
  ${actressCardFragment}
  ${websiteCardFragment}
`;
