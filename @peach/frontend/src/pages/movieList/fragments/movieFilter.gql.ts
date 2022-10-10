import gql from 'graphql-tag';

export const movieFilterFragment = gql`
  fragment MovieFilter on MovieFilter {
    __typename
    ... on TitleMovieFilter {
      title
    }
    ... on UntouchedMovieFilter {
      untouched
    }
    ... on WebsiteMovieFilter {
      website {
        id
        name
        picture
      }
    }
    ... on ActressMovieFilter {
      actress {
        id
        name
      }
    }
    ... on FetishMovieFilter {
      genre {
        id
        name
        picture
      }
    }
  }
`;
