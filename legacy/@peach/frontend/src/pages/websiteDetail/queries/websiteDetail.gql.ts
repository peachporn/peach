import gql from 'graphql-tag';
import { websiteDetailFragment } from '../fragments/websiteDetail.gql';

export const websiteDetailQuery = gql`
  query WebsiteDetail($id: Int!) {
    website(id: $id) {
      ...WebsiteDetail
    }
  }

  ${websiteDetailFragment}
`;
