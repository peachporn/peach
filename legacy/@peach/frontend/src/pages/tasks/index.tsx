import { Fragment, FunctionalComponent, h } from 'preact';
import { Helmet } from 'react-helmet';
import { i } from '../../i18n/i18n';
import { TaskLauncher } from './components/taskLauncher';
import { TasksList } from './components/tasksList';

export const TasksPage: FunctionalComponent = () => (
  <Fragment>
    <Helmet>
      <title>
        {i('PAGE_TITLE_TASKS')} {i('PAGE_TITLE_SUFFIX')}
      </title>
    </Helmet>
    <main className="pb-12">
      <h1 className="max-w-screen-md mx-auto font-display pt-8 text-3xl text-white text-shadow-md flex justify-between pr-4">
        {i('TASKS')}
      </h1>
      <section className="bg-white p-8 min-h-screen shadow-lg">
        <div className="max-w-screen-md mx-auto">
          <TaskLauncher />
          <TasksList />
        </div>
      </section>
    </main>
  </Fragment>
);
