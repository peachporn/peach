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
    <div className={`bg-white shadow w-full px-8 ${visible ? 'pt-4' : 'py-4'}`}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 place-items-center flex rounded-full p-2 focus:outline-none bg-gray-50">
          <Icon
            icon="search"
            className="text-pink text-glow"
            onClick={() => {
              setVisible(!visible);
            }}
          />
          <input
            className="input border-b-0 bg-gray-50 w-full"
            placeholder={visible ? i('MOVIE_TITLE') : ''}
            onClick={() => {
              setVisible(!visible);
            }}
            onKeyUp={e => {
              setName((e.target as HTMLInputElement).value);
            }}
          />
        </div>
      </div>
      <div
        className={`${
          visible ? 'max-h-full pb-8' : 'max-h-0'
        } relative grid items-start grid-cols-1 md:grid-cols-4 gap-3 transition-all overflow-hidden`}
      >
        <div className="py-4">
          <span className="text-gray-500 text-sm">{i('GENRE_KINKINESS')}</span>
          <KinkinessSlider kinkiness={filter.minKinkiness || 0} setKinkiness={setKinkiness} />
        </div>
        <Icon
          icon="keyboard_arrow_up"
          className={`${
            visible ? 'block' : 'hidden'
          } absolute bottom-0 w-full text-center bg-gray-50`}
          onClick={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};
