import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { i } from '../../i18n/i18n';
import { settingsRoute } from '../../utils/route';
import { Icon } from '../../components/icon';
import { TasksList } from './components/tasksList';
import { TaskLauncher } from './components/taskLauncher';

export const TasksPage: FunctionalComponent = () => (
  <Fragment>
    <Helmet>
      <title>
        {i('PAGE_TITLE_TASKS')} {i('PAGE_TITLE_SUFFIX')}
      </title>
    </Helmet>
    <main className="pb-12">
      <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md flex justify-between pr-4">
        {i('TASKS')}
        <Link to={settingsRoute} className="text-white">
          <Icon icon="settings" />
        </Link>
      </h1>
      <section className="bg-white p-8 min-h-screen shadow-lg">
        <TaskLauncher />
        <TasksList />
      </section>
    </main>
  </Fragment>
);
