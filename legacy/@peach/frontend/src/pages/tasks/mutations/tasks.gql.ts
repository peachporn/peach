import gql from 'graphql-tag';

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

export const cancelTasksMutation = gql`
  mutation cancelTasks($taskIds: [Int!]!) {
    cancelTasks(taskIds: $taskIds)
  }
`;
