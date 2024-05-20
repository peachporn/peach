import gql from 'graphql-tag';
import { actressScrapeResult } from '../../../pages/actressList/fragments/actressScrapeResult.gql';

export const scrapeActressQuery = gql`
  query scrapeActress($request: ActressScrapeRequest!) {
    scrapeActress(request: $request) {
      ...ActressScrapeResult
    }
  }

  ${actressScrapeResult}
`;
