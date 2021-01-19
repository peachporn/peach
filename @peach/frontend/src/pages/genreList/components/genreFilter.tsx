import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { GenreFilterContext } from '../context/genreFilter';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { KinkinessSlider } from './kinkinessSlider';

export const GenreFilter: FunctionalComponent = () => {
  const [visible, setVisible] = useState(false);
  const { filter, setName, setKinkiness } = useContext(GenreFilterContext);

  return (
    <div className={`shadow-sm -mt-8 -mx-8 w-screen px-8 mb-4 ${visible ? 'pt-4' : 'py-4'}`}>
      <div className="flex justify-center items-center">
        <Icon
          icon="search"
          className={`text-pink rounded-full p-2 focus:outline-none ${
            visible ? 'bg-transparent' : 'bg-gray-50'
          } text-glow`}
          onClick={() => {
            if (!visible) {
              setVisible(true);
            }
          }}
        />
        <input
          className={`transition-all w-full py-1 border-b border-gray-200 focus:border-pink focus:outline-none ${
            visible ? 'pl-2 max-w-screen-md' : 'max-w-0'
          }`}
          value={filter.name}
          placeholder={i('GENRE_FILTER_NAME')}
          onKeyUp={event => {
            setName((event.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div className={`${visible ? 'max-h-full' : 'max-h-0'} transition-all overflow-hidden -mx-8`}>
        <div className="px-8 pb-4 pt-2">
          <span className="text-gray-500 text-sm">{i('GENRE_KINKINESS')}</span>
          <KinkinessSlider kinkiness={filter.minKinkiness || 0} setKinkiness={setKinkiness} />
        </div>
        <Icon
          icon="keyboard_arrow_up"
          className="block text-center bg-gray-50 "
          onClick={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};
