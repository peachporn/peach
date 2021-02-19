import gql from 'graphql-tag';
import { genreCardFragment } from '../../../components/genreCard/genreCardFragment.gql';

export const genreDetailFragment = gql`
  fragment GenreDetail on Genre {
    id
    name
    category
    kinkiness
    picture
    fetishMovies {
      id
      title
      screencaps {
        src
        cover
      }
    }
    movies {
      id
      title
      screencaps {
        src
        cover
      }
    }

    validAsRoot
    linkableChildren {
      ...GenreCard
    }
  }

  ${genreCardFragment}
`;
