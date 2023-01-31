import { useMutation } from '@apollo/client';
import {
  CancelTaskMutation,
  CancelTaskMutationVariables,
  DeleteMovieMutation,
  DeleteMovieMutationVariables,
  RestartTaskMutation,
  RestartTaskMutationVariables,
  TaskFragment,
} from '@peach/types';
import { FunctionalComponent, h } from 'preact';
import { Icon } from '../../../components/icon';
import { i } from '../../../i18n/i18n';
import { deleteMovieMutation } from '../../movieDetail/mutations/deleteMovie.gql';
import { cancelTaskMutation, restartTaskMutation } from '../mutations/tasks.gql';

type ErroredTaskActionsProps = {
  task: TaskFragment;
  setTasks: (setter: (ts: TaskFragment[]) => TaskFragment[]) => void;
};

export const ErroredTaskActions: FunctionalComponent<ErroredTaskActionsProps> = ({
  task,
  setTasks,
}) => {
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

  const movieId =
    (JSON.parse(task.parameters ?? '{}') as { movie: { id: number } })?.movie?.id ?? null;
  const [deleteMovie] = useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(
    deleteMovieMutation,
    {
      variables: {
        movieId: movieId!,
      },
    },
  );

  const deleteMovieButton = (
    <button
      className="text-xs flex items-center"
      onClick={() => {
        deleteMovie().then(cancelTask);
      }}
    >
      <Icon icon={'delete_forever'} />
      {i('MOVIE_DELETE')}
    </button>
  );

  const restartButton = (
    <button
      className="text-xs flex items-center"
      onClick={() => {
        setTasks(previousTasks =>
          previousTasks.map(t => (t.id === task.id ? { ...task, status: 'RUNNING' } : t)),
        );
        restartTask();
      }}
    >
      <Icon icon="restart_alt" />
      {i('TASK_RESTART')}
    </button>
  );

  const clearButton = (
    <button
      className="text-xs flex items-center"
      onClick={() => {
        setTasks(previousTasks => previousTasks.filter(t => t.id !== task.id));
        cancelTask();
      }}
    >
      <Icon icon="clear" />
      {i('TASK_CANCEL')}
    </button>
  );

  return (
    <div className="flex py-3 gap-4">
      {[
        restartButton,
        clearButton,
        (task.category === 'CONVERT_MOVIE' || task.category === 'SCRAPE_METADATA') &&
        task.statusMessage !== 'SERVER_RESTARTED'
          ? deleteMovieButton
          : null,
      ].filter(Boolean)}
    </div>
  );
};
