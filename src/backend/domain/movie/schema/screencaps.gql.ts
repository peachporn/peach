import { gql } from 'apollo-server';

export const screencapsTypeDefs = gql`
  type Screencap {
    index: Int!
    cover: Boolean!
    src: String!
  }
`;
