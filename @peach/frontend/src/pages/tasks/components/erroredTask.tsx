import { FunctionalComponent, h } from 'preact';
import { TaskCategory } from '@peach/tasks';
import {
  CancelTaskMutation,
  CancelTaskMutationVariables,
  RestartTaskMutation,
  RestartTaskMutationVariables,
  TaskFragment,
} from '@peach/types';
import { useMutation } from '@apollo/client';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { cancelTaskMutation, restartTaskMutation } from '../mutations/tasks.gql';
import { taskIdentifier } from '../utils/taskIdentifier';

type ErroredTaskProps = {
  task: TaskFragment;
};

export const ErroredTask: FunctionalComponent<ErroredTaskProps> = ({ task }) => {
  const [restartTask] = useMutation<RestartTaskMutation, RestartTaskMutationVariables>(
    restartTaskMutation,
    {
      variables: {
        taskId: task.id,
      },
    },
  );

  const [cancelTask] = useMutation<CancelTaskMutation, CancelTaskMutationVariables>(
    cancelTaskMutation,
    {
      variables: {
        taskId: task.id,
      },
    },
  );

  return (
    <div className="py-2 border-b border-gray-200">
      <h3 className="flex items-center text-lg">
        <Icon className="mr-2" icon="warning" />
        {i(task.category as TaskCategory)}
      </h3>
      <div className="w-full grid grid-cols-3 grid-flow-row-dense items-center">
        <span className="col-start-1 col-span-2 break-all">{taskIdentifier(task)}</span>
        <span className="col-start-1 col-span-2 font-bold text-pink break-all">
          {task.statusMessage}
        </span>
        <div className="justify-self-end row-span-2">
          <button onClick={() => restartTask()}>
            <Icon
              className="bg-gray-100 rounded-full p-2 mr-1 focus:outline-none active:bg-pink active:text-white transition-all"
              icon="restart_alt"
            />
          </button>
          <button onClick={() => cancelTask()}>
            <Icon
              className="bg-gray-100 rounded-full p-2 focus:outline-none active:bg-pink active:text-white transition-all"
              icon="clear"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
