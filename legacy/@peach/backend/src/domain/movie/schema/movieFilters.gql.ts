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

  type EquipmentMovieFilter {
    type: EquipmentInputType
  }

  union MovieFilter =
      TitleMovieFilter
    | ActressMovieFilter
    | WebsiteMovieFilter
    | FetishMovieFilter
    | UntouchedMovieFilter
    | EquipmentMovieFilter

  extend type Query {
    movieFilters(query: String!): [MovieFilter!]!
  }
`;
