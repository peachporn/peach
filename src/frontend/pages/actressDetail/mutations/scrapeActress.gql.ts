import { gql } from 'apollo-boost';

export const scrapeActressMutation = gql`
  mutation ScrapeActress($id: Int!) {
    scrapeActress(id: $id)
  }
`;
