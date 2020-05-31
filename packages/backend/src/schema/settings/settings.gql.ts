import { gql } from 'apollo-server';

export const typeDef = gql`
  enum Language {
    EN
  }
  type Settings {
    language: Language
    volumes: [Volume!]!
  }

  extend type Query {
    settings: Settings!
  }
`;
