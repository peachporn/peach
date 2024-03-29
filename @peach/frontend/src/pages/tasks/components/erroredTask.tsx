import { TaskCategory } from '@peach/tasks';
import { TaskFragment } from '@peach/types';
import { FunctionalComponent, h } from 'preact';
import { Icon } from '../../../components/icon';
import { i } from '../../../i18n/i18n';
import { taskIdentifier } from '../utils/taskIdentifier';
import { ErroredTaskActions } from './erroredTaskActions';

type ErroredTaskProps = {
  task: TaskFragment;
  setTasks: (setter: (ts: TaskFragment[]) => TaskFragment[]) => void;
};

export const ErroredTask: FunctionalComponent<ErroredTaskProps> = ({ setTasks, task }) => (
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
    </div>
    <ErroredTaskActions task={task} setTasks={setTasks} />
  </div>
);
