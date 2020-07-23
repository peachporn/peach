import { gql } from 'apollo-boost';

export const genresListQuery = gql`
  query genresList($limit: Int!, $skip: Int!) {
    genres(limit: $limit, skip: $skip) {
      id
      name
      picture
      category
    }
  }
`;

export const genresCountQuery = gql`
  query genresCount {
    genresCount
  }
`;
