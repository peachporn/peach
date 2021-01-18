import { Fragment, FunctionalComponent, h } from 'preact';
import { i } from '../../i18n/i18n';
import { TasksList } from './components/tasksList';

export const TasksPage: FunctionalComponent = () => (
  <Fragment>
    <h1 className="font-display text-xl">{i('TASKS')}</h1>
    <TasksList />
  </Fragment>
);
