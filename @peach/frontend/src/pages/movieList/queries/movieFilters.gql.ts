import gql from 'graphql-tag';

export const movieFiltersQuery = gql`
  query movieFilters($query: String!) {
    movieFilters(query: $query) {
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
          picture
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
  }
`;
