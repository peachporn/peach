import { Fragment, FunctionalComponent, h } from 'preact';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { TaskCategory, TaskStatusMessage } from '@peach/tasks';
import {
  CancelTaskMutation,
  CancelTaskMutationVariables,
  CancelTasksMutation,
  CancelTasksMutationVariables,
  RestartTaskMutation,
  RestartTaskMutationVariables,
  RestartTasksMutation,
  RestartTasksMutationVariables,
  TasksQuery,
  TaskStatus,
} from '@peach/types';
import { takeAllScreencapsMutation } from '../mutations/takeScreencaps.gql';
import { scanLibraryMutation } from '../mutations/scanLibrary.gql';
import {
  cancelTaskMutation,
  cancelTasksMutation,
  restartTaskMutation,
  restartTasksMutation,
} from '../mutations/tasks.gql';
import { movieDetailRoute } from '../../../utils/route';
import {
  TaskEntryCategory,
  TaskEntryControls,
  TaskEntryDetails,
  TaskEntryParameters,
  TaskEntryStatus,
  TaskList,
  TaskListEntry,
} from './taskList';
import { i } from '../../../i18n/i18n';
import { tasksQuery } from '../queries/tasks.gql';
import { Icon } from '../../../components/icon';

const TaskStatusDisplay: FunctionalComponent<{ status: TaskStatus }> = ({ status }) => {
  if (status === 'ERROR') {
    return (
      <Fragment>
        <Icon icon="error" />
        {i('TASK_ERROR')}
      </Fragment>
    );
  }
  if (status === 'RUNNING') {
    return (
      <Fragment>
        <Icon icon="settings" />
        {i('TASK_RUNNING')}
      </Fragment>
    );
  }
  if (status === 'PENDING') {
    return (
      <Fragment>
        <Icon icon="access_alarm" />
        {i('TASK_PENDING')}
      </Fragment>
    );
  }

  return null;
};

const TaskView: FunctionalComponent<{ task: TasksQuery['tasks'][number] }> = ({
  task: { id, category, parameters, status, statusMessage },
}) => {
  const [restartTask] = useMutation<RestartTaskMutation, RestartTaskMutationVariables>(
    restartTaskMutation,
    {
      variables: {
        taskId: id,
      },
    },
  );
  const [cancelTask] = useMutation<CancelTaskMutation, CancelTaskMutationVariables>(
    cancelTaskMutation,
    {
      variables: {
        taskId: id,
      },
    },
  );
  const params = JSON.parse(parameters || '{}');

  return (
    <TaskListEntry>
      <TaskEntryCategory>
        {i(category as TaskCategory)}
        {category === 'TAKE_SCREENCAP' ? ` - ${params.index}` : ''}
      </TaskEntryCategory>
      <TaskEntryParameters>
        {['ENQUEUE_SCREENCAPS', 'TAKE_SCREENCAP'].includes(category) &&
        params?.movie?.title &&
        params?.movie?.id ? (
          <a href={movieDetailRoute(params.movie.id)}>{params.movie.title}</a>
        ) : null}
      </TaskEntryParameters>
      <TaskEntryStatus>
        <TaskStatusDisplay status={status} />
      </TaskEntryStatus>
      {status === 'ERROR' ? (
        <TaskEntryControls>
          <button
            onClick={() => {
              restartTask().then(() => {
                toast.success(i('TASK_RESTART_SUCCESS'));
              });
            }}
          >
            {i('TASK_RESTART')}
          </button>
          <button
            onClick={() => {
              cancelTask();
            }}
          >
            {i('TASK_CANCEL')}
          </button>
        </TaskEntryControls>
      ) : status === 'PENDING' ? (
        <TaskEntryControls>
          <button
            onClick={() => {
              cancelTask();
            }}
          >
            {i('TASK_CANCEL')}
          </button>
        </TaskEntryControls>
      ) : null}
      {status !== 'ERROR' ? null : (
        <TaskEntryDetails>{i(statusMessage as TaskStatusMessage)}</TaskEntryDetails>
      )}
    </TaskListEntry>
  );
};

const TaskControls: FunctionalComponent = () => {
  const [takeAllScreencaps] = useMutation(takeAllScreencapsMutation);
  const [scanLibrary] = useMutation(scanLibraryMutation);

  return (
    <div className="flex justify-end">
      <button
        onClick={() =>
          scanLibrary().then(() => {
            toast.success(i('LIBRARY_SCAN_STARTED'));
          })
        }
      >
        {i('SETTINGS_SCAN_LIBRARY')}
      </button>
      <button
        onClick={() =>
          takeAllScreencaps().then(() => {
            toast.success(i('SCREENCAPPING_STARTED'));
          })
        }
      >
        {i('SETTINGS_TAKE_SCREENCAPS')}
      </button>
    </div>
  );
};

export const TasksList: FunctionalComponent = () => {
  const { data, loading } = useQuery<TasksQuery>(tasksQuery, {
    pollInterval: 1000,
  });

  const [restartFailedTasks] = useMutation<RestartTasksMutation, RestartTasksMutationVariables>(
    restartTasksMutation,
    {
      variables: {
        taskIds: (data?.tasks || []).filter(task => task.status === 'ERROR').map(task => task.id),
      },
    },
  );

  const [cancelFailedTasks] = useMutation<CancelTasksMutation, CancelTasksMutationVariables>(
    cancelTasksMutation,
    {
      variables: {
        taskIds: (data?.tasks || []).filter(task => task.status === 'ERROR').map(task => task.id),
      },
    },
  );

  return loading || !data ? null : (
    <div>
      <h2>
        <button
          onClick={() => {
            restartFailedTasks().then(() => {
              toast.success(i('TASKS_RESTART_SUCCESS'));
            });
          }}
        >
          {i('SETTINGS_RESTART_FAILED')}
        </button>
        <button
          onClick={() => {
            cancelFailedTasks().then(() => {
              toast.success(i('TASKS_CANCEL_SUCCESS'));
            });
          }}
        >
          {i('SETTINGS_CANCEL_FAILED')}
        </button>
      </h2>
      <TaskList>
        {data.tasks.map(task => (
          <TaskView task={task} />
        ))}
        {data.tasks.length === 0 ? <span>No tasks running!</span> : null}
      </TaskList>
      <TaskControls />
    </div>
  );
};
