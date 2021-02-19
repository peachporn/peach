import gql from 'graphql-tag';
import { actressDetailFragment } from '../fragments/actressDetail.gql';

export const actressDetailQuery = gql`
  query ActressDetail($id: Int!) {
    actress(id: $id) {
      ...ActressDetail
    }
  }

  ${actressDetailFragment}
`;
