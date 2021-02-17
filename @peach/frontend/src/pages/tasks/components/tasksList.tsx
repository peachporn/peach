import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { TaskCategory } from '@peach/tasks';
import { TaskFragment, TasksQuery, TaskStatus } from '@peach/types';
import { groupBy } from 'ramda';
import { i } from '../../../i18n/i18n';
import { tasksQuery } from '../queries/tasks.gql';
import { TaskControls } from './taskControls';
import { TaskStatusMessages } from './taskStatusMessages';
import { Icon } from '../../../components/icon';

type TaskViewProps = {
  taskGroups: [TaskStatus, [TaskCategory, TaskFragment[]][]][];
};

const TaskView: FunctionalComponent<TaskViewProps> = ({ taskGroups }) => {
  console.log(taskGroups);

  return (
    <Fragment>
      {taskGroups.flatMap(([status, categories]) =>
        categories.map(([category, tasks]) => (
          <div className="py-2 border-b border-gray-200">
            <h3 className="text-lg mb-1">{i(category as TaskCategory)}</h3>
            {status === 'RUNNING' ? (
              <Fragment>
                <div className="meter w-full relative h-6">
                  <span className="bg-pink rounded-lg" />
                  <p className="absolute top-0 text-white font-bold right-4">{tasks.length}</p>
                </div>
                <p className="pt-2 pb-1">
                  <TaskStatusMessages tasks={tasks} />
                </p>
              </Fragment>
            ) : status === 'PENDING' ? (
              <Fragment>
                <div className="meter no-move w-full relative h-6">
                  <span className="bg-gray-200 rounded-lg" />
                  <p className="absolute top-0 text-pink font-bold right-4">{tasks.length}</p>
                </div>
                <p className="pt-2 pb-1">
                  <TaskStatusMessages tasks={tasks} />
                </p>
              </Fragment>
            ) : (
              <div className="flex items-center">
                <Icon className="mr-2" icon="warning" />
                {tasks.map(t => t.statusMessage).join('\n')}
              </div>
            )}
          </div>
        )),
      )}
    </Fragment>
  );
};

export const TasksList: FunctionalComponent = () => {
  const { data, loading } = useQuery<TasksQuery>(tasksQuery, {
    pollInterval: 1000,
  });
  console.log(data?.tasks);

  return loading || !data ? null : (
    <div>
      <h2 className="flex justify-between items-end border-b border-gray-200 pb-2">
        <span className="text-lg">{i('TASK_RUNNING')}</span>
        <TaskControls tasks={data?.tasks} />
      </h2>
      <div>
        <TaskView
          taskGroups={Object.entries(
            groupBy(task => task.status, data.tasks),
          ).map(([status, tasks]) => [
            status as TaskStatus,
            Object.entries(groupBy(task => task.category, tasks)).map(([category, task]) => [
              category as TaskCategory,
              task,
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
