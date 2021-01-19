import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import { FetishesQuery, FetishesQueryVariables } from '@peach/types';
import uniqBy from 'ramda/es/uniqBy';
import { SettingsContext } from '../../../context/settings';
import { i } from '../../../i18n/i18n';
import { fetishesQuery } from '../queries/fetishes.gql';
import { FetishBubble } from '../../../components/fetishBubble';
import { nonNullish } from '../../../utils/list';

export const UIForm: FunctionalComponent = () => {
  const {
    settings: { pinnedFetishes },
    form: { setValue, watch, register },
  } = useContext(SettingsContext);

  const selectedPinnedFetishes = watch('pinnedFetishes')
    .split(',')
    .filter(Boolean)
    .map(f => parseInt(f, 10));

  const [genreName, setGenreName] = useState<string>('');

  const { data } = useQuery<FetishesQuery, FetishesQueryVariables>(fetishesQuery, {
    variables: { name: genreName, limit: 5 - selectedPinnedFetishes.length },
  });

  return (
    <Fragment>
      <h2 className="text-xl mb-2 border-b mt-8">{i('SETTINGS_UI')}</h2>
      <div className="grid grid-cols-2 items-center text-xs">
        <span>{i('SETTINGS_PINNEDFETISHES')}</span>
        <input
          className="input"
          placeholder={i('SETTINGS_PINNEDFETISHES_PLACEHOLDER')}
          onKeyUp={event => setGenreName((event.target as HTMLInputElement)?.value)}
        />
        <input className="hidden" name="pinnedFetishes" ref={register} />
        <div className="grid grid-cols-5 mt-2 col-span-2 h-20">
          {uniqBy(g => g.id, [...pinnedFetishes, ...(data?.genres || [])]).map(g => (
            <FetishBubble
              className={selectedPinnedFetishes.includes(g.id) ? '' : 'opacity-70'}
              onClick={() => {
                setValue(
                  'pinnedFetishes',
                  selectedPinnedFetishes.includes(g.id)
                    ? selectedPinnedFetishes.filter(f => f !== g.id).join(',')
                    : [...selectedPinnedFetishes, g.id].join(','),
                  { shouldDirty: true },
                );
              }}
              genre={g}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
