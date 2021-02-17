import { FunctionalComponent, h } from 'preact';
import { useMutation } from '@apollo/client';
import {
  CancelTasksMutation,
  CancelTasksMutationVariables,
  RestartTasksMutation,
  RestartTasksMutationVariables,
  TaskFragment,
} from '@peach/types';
import { cancelTasksMutation, restartTasksMutation } from '../mutations/tasks.gql';
import { Icon } from '../../../components/icon';

type TaskControlsProps = {
  tasks: TaskFragment[];
};

export const TaskControls: FunctionalComponent<TaskControlsProps> = ({ tasks }) => {
  const [restartFailedTasks] = useMutation<RestartTasksMutation, RestartTasksMutationVariables>(
    restartTasksMutation,
    {
      variables: {
        taskIds: (tasks || []).filter(task => task.status === 'ERROR').map(task => task.id),
      },
    },
  );

  const [cancelFailedTasks] = useMutation<CancelTasksMutation, CancelTasksMutationVariables>(
    cancelTasksMutation,
    {
      variables: {
        taskIds: (tasks || []).filter(task => task.status === 'ERROR').map(task => task.id),
      },
    },
  );
  return (
    <div>
      <button onClick={() => restartFailedTasks()}>
        <Icon
          className="bg-gray-100 rounded-full p-2 mr-1 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="restart_alt"
        />
      </button>
      <button onClick={() => cancelFailedTasks()}>
        <Icon
          className="bg-gray-100 rounded-full p-2 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="clear"
        />
      </button>
    </div>
  );
};
