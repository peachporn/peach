import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { Icon } from '../../components/icon';
import { SettingsContext } from '../../context/settings';
import { i } from '../../i18n/i18n';
import { GeneralSettingsForm } from './components/generalSettingsForm';
import { LibraryForm } from './components/libraryForm';
import { UIForm } from './components/uiForm';
import { VolumeForm } from './components/volumeForm';

export const SettingsPage: FunctionalComponent = () => {
  const {
    form: {
      formState: { dirtyFields },
    },
    submit,
  } = useContext(SettingsContext);
  const isDisabled = Object.keys(dirtyFields).length === 0;

  return (
    <Fragment>
      <Helmet>
        <title>
          {i('PAGE_TITLE_SETTINGS')} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <h1 className="max-w-screen-md mx-auto font-display pt-8 text-3xl text-white pl-6 md:pl-0 text-shadow-md flex justify-between pr-4 md:pr-0">
          {i('SETTINGS')}
        </h1>
        <section className="bg-white p-8 min-h-screen shadow-lg">
          <div className="max-w-screen-md mx-auto">
            <GeneralSettingsForm />
            <UIForm />
            <LibraryForm />
            <VolumeForm />
            <div className="grid grid-cols-1 pt-3">
              <button
                className={`${
                  isDisabled ? 'bg-gray-200' : 'bg-pink'
                } rounded-sm text-white py-1 px-3`}
                disabled={isDisabled}
                onClick={submit}
              >
                <Icon icon="check" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};
