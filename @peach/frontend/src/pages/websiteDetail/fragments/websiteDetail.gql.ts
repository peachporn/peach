import gql from 'graphql-tag';
import { genreCardFragment } from '../../../components/genreCard/genreCardFragment.gql';

export const websiteDetailFragment = gql`
  fragment WebsiteDetail on Website {
    id
    name
    url
    picture
    fetish {
      ...GenreCard
    }
    movies {
      id
      title
      screencaps {
        src
        cover
      }
    }
  }

  ${genreCardFragment}
`;
