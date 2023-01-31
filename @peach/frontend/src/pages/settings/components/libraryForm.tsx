import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Checkbox } from '../../../components/checkbox';
import { SettingsContext } from '../../../context/settings';
import { i } from '../../../i18n/i18n';

export const LibraryForm: FunctionalComponent = () => {
  const {
    form: { register, errors },
    validatePathExists,
  } = useContext(SettingsContext);

  return (
    <Fragment>
      <h2 className="text-xl mb-2 border-b mt-8">{i('SETTINGS_LIBRARY')}</h2>
      <div className="grid grid-cols-2 items-center text-xs">
        <span className="text-2xs col-span-2">{i('SETTINGS_LIBRARYPATH')}</span>
        <input
          className={`col-span-2 input mb-4 ${errors.libraryPath ? 'border-red' : ''}`}
          name="libraryPath"
          ref={register({
            validate: validatePathExists,
          })}
        />
        <span className="text-2xs col-span-2">{i('SETTINGS_INFERMOVIETITLE')}</span>
        <select
          className="block bg-white col-span-2 input mb-4"
          name="inferMovieTitle"
          ref={register}
        >
          <option value="FOLDER">{i('SETTINGS_INFERMOVIETITLE_FOLDER')}</option>
          <option value="FILENAME">{i('SETTINGS_INFERMOVIETITLE_FILENAME')}</option>
        </select>
        <span className="text-2xs col-span-2">{}</span>
        <Checkbox
          name="autoConvertMovies"
          register={register}
          label={<Fragment>{i('SETTINGS_AUTOCONVERTMOVIES')}</Fragment>}
        />
      </div>
    </Fragment>
  );
};
