import { gql } from 'apollo-boost';

export const restartTaskMutation = gql`
  mutation restartTask($taskId: Int!) {
    restartTask(taskId: $taskId) {
      id
    }
  }
`;

export const restartTasksMutation = gql`
  mutation restartTasks($taskIds: [Int!]!) {
    restartTasks(taskIds: $taskIds)
  }
`;

export const cancelTaskMutation = gql`
  mutation cancelTask($taskId: Int!) {
    cancelTask(taskId: $taskId)
  }
`;
