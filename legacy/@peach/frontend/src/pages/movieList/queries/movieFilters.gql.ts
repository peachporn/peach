import gql from 'graphql-tag';

export const movieFiltersQuery = gql`
  query movieFilters($query: String!) {
    movieFilters(query: $query) {
      __typename
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
      ... on EquipmentMovieFilter {
        type
      }
    }
  }
`;
