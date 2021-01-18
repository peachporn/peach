import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { GeneralSettingsForm } from './components/generalSettingsForm';
import { LibraryForm } from './components/libraryForm';
import { i } from '../../i18n/i18n';
import { VolumeForm } from './components/volumeForm';
import { SettingsContext } from '../../context/settings';
import { Icon } from '../../components/icon';
import { isTouched } from '../../utils/form';
import { UIForm } from './components/uiForm';

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
      <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">{i('SETTINGS')}</h1>
      <section className="bg-white p-8 min-h-screen shadow-lg">
        <GeneralSettingsForm />
        <UIForm />
        <LibraryForm />
        <VolumeForm />
        <div className="grid grid-cols-1 pt-3">
          <button
            className={`${isDisabled ? 'bg-gray-200' : 'bg-pink'} rounded-sm text-white py-1 px-3`}
            disabled={isDisabled}
            onClick={submit}
          >
            <Icon icon="check" />
          </button>
        </div>
      </section>
    </Fragment>
  );
};
