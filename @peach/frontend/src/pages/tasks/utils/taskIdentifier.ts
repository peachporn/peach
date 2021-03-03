import { TaskCategory } from '@peach/tasks';
import { TaskFragment } from '@peach/types';

const taskIdentifierFns: Record<TaskCategory, (task: TaskFragment) => string> = {
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

export const taskIdentifier = (t: TaskFragment) => {
  const identifierFn = taskIdentifierFns[t.category as TaskCategory];
  if (!identifierFn) return '';
  return identifierFn(t);
};
