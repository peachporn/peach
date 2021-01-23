import gql from 'graphql-tag';
import { actressScrapeResult } from '../fragments/actressScrapeResult.gql';

export const scrapeActressQuery = gql`
  query scrapeActress($name: String!) {
    scrapeActress(name: $name) {
      ...ActressScrapeResult
    }
  }

  ${actressScrapeResult}
`;
