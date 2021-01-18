import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { SettingsContext } from '../../../context/settings';
import { i } from '../../../i18n/i18n';

export const GeneralSettingsForm: FunctionalComponent = () => {
  const {
    settings: { language },
    form: { register },
  } = useContext(SettingsContext);

  return (
    <Fragment>
      <h2 className="text-xl mb-2 border-b">{i('SETTINGS_GENERAL')}</h2>
      <div className="grid grid-cols-2 items-center text-xs">
        <span>{i('SETTINGS_LANGUAGE')}</span>
        <select className="block bg-white border-b border-gray py-1" name="language" ref={register}>
          <option selected={language === 'EN'} value="EN">
            {i('SETTINGS_LANGUAGE_EN')}
          </option>
        </select>
      </div>
    </Fragment>
  );
};
