import { useQuery } from '@apollo/client';
import { TaskCategory } from '@peach/tasks';
import { TaskFragment, TasksQuery, TaskStatus } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { groupBy } from 'ramda';
import { i } from '../../../i18n/i18n';
import { tasksQuery } from '../queries/tasks.gql';
import { taskIdentifier } from '../utils/taskIdentifier';
import { ErroredTask } from './erroredTask';
import { TaskControls } from './taskControls';

type TaskViewProps = {
  taskGroups: [TaskStatus, [TaskCategory, TaskFragment[]][]][];
  setTasks: (setter: (ts: TaskFragment[]) => TaskFragment[]) => void;
};

const TaskView: FunctionalComponent<TaskViewProps> = ({ setTasks, taskGroups }) => (
  <Fragment>
    {taskGroups.flatMap(([status, categories]) =>
      categories.map(([category, tasks]) =>
        ['RUNNING', 'PENDING'].includes(status) ? (
          <div className="py-2 border-b border-gray-200">
            <h3 className="text-lg mb-1">{i(category as TaskCategory)}</h3>
            {status === 'RUNNING' ? (
              <Fragment>
                <div className="meter w-full relative h-6">
                  <span className="bg-pink rounded-lg" />
                  <p className="absolute top-0 text-white font-bold right-4">{tasks.length}</p>
                </div>
                <p className="pt-2 pb-1">
                  {tasks
                    .map(taskIdentifier)
                    .slice(0, 11)
                    .map(m => (
                      <Fragment>
                        {m}
                        <br />
                      </Fragment>
                    ))}
                  {tasks.length > 10 ? `... ${tasks.length - 10} more` : ''}
                </p>
              </Fragment>
            ) : status === 'PENDING' ? (
              <Fragment>
                <div className="meter no-move w-full relative h-6">
                  <span className="bg-gray-200 rounded-lg" />
                  <p className="absolute top-0 text-pink font-bold right-4">{tasks.length}</p>
                </div>
                <p className="pt-2 pb-1">
                  {tasks
                    .map(taskIdentifier)
                    .slice(0, 11)
                    .map(m => (
                      <Fragment>
                        {m}
                        <br />
                      </Fragment>
                    ))}
                  {tasks.length > 10 ? `... ${tasks.length - 10} more` : ''}
                </p>
              </Fragment>
            ) : (
              ''
            )}
          </div>
        ) : (
          tasks.map(t => <ErroredTask setTasks={setTasks} task={t} />)
        ),
      ),
    )}
  </Fragment>
);
export const TasksList: FunctionalComponent = () => {
  const [tasks, setTasks] = useState<TasksQuery['tasks']>([]);
  const { data, loading } = useQuery<TasksQuery>(tasksQuery, {
    pollInterval: 1000,
  });

  useEffect(() => {
    setTasks(data?.tasks ?? []);
  }, [data?.tasks]);

  return loading || !data ? null : (
    <div>
      <h2 className="flex justify-end items-end border-b border-gray-200 pb-2">
        <TaskControls tasks={tasks} />
      </h2>
      <div>
        <TaskView
          setTasks={setTasks}
          taskGroups={Object.entries(groupBy(task => task.status, tasks)).map(([status, ts]) => [
            status as TaskStatus,
            Object.entries(groupBy(task => task.category, ts)).map(([category, t]) => [
              category as TaskCategory,
              t,
            ]),
          ])}
        />
        {data.tasks.length === 0 ? (
          <span className="block w-full text-center text-lg text-gray-300 py-5">
            {i('TASKS_NONE')}
          </span>
        ) : null}
      </div>
    </div>
  );
};
