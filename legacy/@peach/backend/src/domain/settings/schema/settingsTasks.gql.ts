import { gql } from 'apollo-server';

export const settingsTasksTypeDefs = gql`
  extend type Mutation {
    scanLibrary: Boolean
    takeAllScreencaps: Boolean
  }
`;
