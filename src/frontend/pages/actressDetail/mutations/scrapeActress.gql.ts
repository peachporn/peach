import gql from 'graphql-tag';

export const scrapeActressMutation = gql`
  mutation ScrapeActress($id: Int!) {
    scrapeActress(id: $id)
  }
`;
