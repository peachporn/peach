import { gql } from 'apollo-server';

export const movieFiltersTypeDefs = gql`
  type TitleMovieFilter {
    title: String!
  }

  type ActressMovieFilter {
    actress: Actress!
  }

  type WebsiteMovieFilter {
    website: Website!
  }

  type FetishMovieFilter {
    genre: Genre!
  }

  type UntouchedMovieFilter {
    untouched: Boolean!
  }

  union MovieFilter =
      TitleMovieFilter
    | ActressMovieFilter
    | WebsiteMovieFilter
    | FetishMovieFilter
    | UntouchedMovieFilter

  extend type Query {
    movieFilters(query: String!): [MovieFilter!]!
  }
`;
