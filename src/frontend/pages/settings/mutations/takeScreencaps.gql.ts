import { gql } from 'apollo-boost';

export const takeAllScreencapsMutation = gql`
  mutation TakeAllScreencaps {
    takeAllScreencaps
  }
`;
