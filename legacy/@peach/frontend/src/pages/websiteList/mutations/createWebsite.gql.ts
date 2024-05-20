import gql from 'graphql-tag';

export const createWebsiteMutation = gql`
  mutation CreateWebsite($data: CreateWebsiteInput!) {
    createWebsite(input: $data) {
      id
      name
    }
  }
`;
