import gql from 'graphql-tag';

export const updateWebsiteMutation = gql`
  mutation UpdateWebsite($websiteId: Int!, $data: UpdateWebsiteInput!) {
    updateWebsite(websiteId: $websiteId, data: $data) {
      id
    }
  }
`;
