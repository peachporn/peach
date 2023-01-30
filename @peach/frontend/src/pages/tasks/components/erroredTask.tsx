import { useMutation } from '@apollo/client';
import { TaskCategory } from '@peach/tasks';
import {
  CancelTaskMutation,
  CancelTaskMutationVariables,
  RestartTaskMutation,
  RestartTaskMutationVariables,
  TaskFragment,
} from '@peach/types';
import { FunctionalComponent, h } from 'preact';
import { Icon } from '../../../components/icon';
import { i } from '../../../i18n/i18n';
import { cancelTaskMutation, restartTaskMutation } from '../mutations/tasks.gql';
import { taskIdentifier } from '../utils/taskIdentifier';

type ErroredTaskProps = {
  task: TaskFragment;
  setTasks: (setter: (ts: TaskFragment[]) => TaskFragment[]) => void;
};

export const ErroredTask: FunctionalComponent<ErroredTaskProps> = ({ setTasks, task }) => {
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
      <div className="w-full grid grid-cols-3 grid-flow-row-dense">
        <span className="col-start-1 col-span-2 break-all py-3">{taskIdentifier(task)}</span>
        <pre className="col-start-1 col-span-3 bg-gray-100 text-pink block text-sm p-3 whitespace-pre-wrap break-all">
          {task.statusMessage}
        </pre>
        <div className="justify-self-end">
          <button
            onClick={() => {
              setTasks(previousTasks =>
                previousTasks.map(t => (t.id === task.id ? { ...task, status: 'RUNNING' } : t)),
              );
              restartTask();
            }}
          >
            <Icon
              className="bg-gray-100 rounded-full p-2 mr-1 focus:outline-none active:bg-pink active:text-white transition-all"
              icon="restart_alt"
            />
          </button>
          <button
            onClick={() => {
              setTasks(previousTasks => previousTasks.filter(t => t.id !== task.id));
              cancelTask();
            }}
          >
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
