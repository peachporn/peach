import { TaskCategory } from '@peach/tasks';
import { TaskFragment } from '@peach/types';
import { h, VNode } from 'preact';
import { Link } from 'react-router-dom';
import { movieDetailRoute } from '../../../utils/route';

const taskIdentifierFns: Record<TaskCategory, (task: TaskFragment) => VNode | null> = {
  SCAN_LIBRARY: () => null,
  SCRAPE_METADATA: task => {
    if (!task.parameters) return null;
    const parameters = JSON.parse(task.parameters);
    return <Link to={movieDetailRoute(parameters.movie.id)}>{parameters.movie.path}</Link>;
  },
  TAKE_SCREENCAP: task => {
    if (!task.parameters) return null;
    const parameters = JSON.parse(task.parameters);
    return <Link to={movieDetailRoute(parameters.movie.id)}>{parameters.movie.title}</Link>;
  },
};

export const taskIdentifier = (t: TaskFragment) => {
  const identifierFn = taskIdentifierFns[t.category as TaskCategory];
  if (!identifierFn) return '';
  return identifierFn(t);
};
