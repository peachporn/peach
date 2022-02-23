import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { GenreSearch } from '../../../components/genreSearch';
import { SettingsContext } from '../../../context/settings';
import { i } from '../../../i18n/i18n';

export const UIForm: FunctionalComponent = () => {
  const {
    settings: { pinnedFetishes },
    form: { setValue, watch, register },
  } = useContext(SettingsContext);

  const selectedPinnedFetishes = watch('pinnedFetishes')
    .split(',')
    .filter(Boolean)
    .map(f => parseInt(f, 10));

  return (
    <Fragment>
      <h2 className="text-xl mb-2 border-b mt-8">{i('SETTINGS_UI')}</h2>
      <div className="grid grid-cols-2 items-center text-xs">
        <span>{i('SETTINGS_PINNEDFETISHES')}</span>
        <input className="hidden" name="pinnedFetishes" ref={register} />
        <GenreSearch
          containerClassName="col-span-2"
          multiple
          placeholder={i('SETTINGS_PINNEDFETISHES_PLACEHOLDER')}
          filterOverride={{ fetish: true }}
          defaultValue={pinnedFetishes.map(g => g.id)}
          onChange={genreIds => {
            setValue('pinnedFetishes', genreIds.join(','), { shouldDirty: true });
          }}
        />
      </div>
    </Fragment>
  );
};
