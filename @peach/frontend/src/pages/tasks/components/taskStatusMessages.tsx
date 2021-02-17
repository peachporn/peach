import { Fragment, FunctionalComponent, h } from 'preact';
import { TaskCategory } from '@peach/tasks';
import { TaskFragment } from '@peach/types';

const taskStatusMessageFns: Record<TaskCategory, (task: TaskFragment) => string> = {
  SCAN_LIBRARY: () => '',
  SCRAPE_METADATA: task => {
    if (!task.parameters) return '';
    const parameters = JSON.parse(task.parameters);
    return `${parameters.movie.path}`;
  },
  ENQUEUE_SCREENCAPS: task => {
    if (!task.parameters) return '';
    const parameters = JSON.parse(task.parameters);
    return `${parameters.movie.title} (${
      parameters.mode === 'allCritical' ? 'Only cover' : 'All'
    })`;
  },
  TAKE_SCREENCAP: task => {
    if (!task.parameters) return '';
    const parameters = JSON.parse(task.parameters);
    return `${parameters.movie.title} - ${parameters.index}/5`;
  },
};

type TaskStatusMessagesProps = {
  tasks: TaskFragment[];
};

export const TaskStatusMessages: FunctionalComponent<TaskStatusMessagesProps> = ({ tasks }) => (
  <Fragment>
    {tasks
      .map(t => {
        const statusMessageFn = taskStatusMessageFns[t.category as TaskCategory];
        if (!statusMessageFn) return '';
        return statusMessageFn(t);
      })
      .map(m => (
        <Fragment>
          {m}
          <br />
        </Fragment>
      ))}
  </Fragment>
);
