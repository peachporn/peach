import { gql } from 'apollo-server';

export const typeDef = gql`
  enum Language {
    EN
  }
  type Settings {
    language: Language
  }

  extend type Query {
    settings: Settings!
  }
`;
