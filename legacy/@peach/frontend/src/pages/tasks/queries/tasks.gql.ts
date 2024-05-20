import gql from 'graphql-tag';
import { taskFragment } from '../fragments/task.gql';

export const tasksQuery = gql`
  query tasks {
    tasks {
      ...Task
    }
  }

  ${taskFragment}
`;
