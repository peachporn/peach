import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MovieFilterContext } from '../context/movieFilter';
import { Icon } from '../../../components/icon';
import { FetishBubble } from '../../../components/fetishBubble';
import { GenreSearch } from '../../../components/genreSearch';
import { i } from '../../../i18n/i18n';

export const MovieFilter: FunctionalComponent = () => {
  const [visible, setVisible] = useState(false);
  const { filter, setFetishes } = useContext(MovieFilterContext);

  return (
    <div className={`bg-white shadow-sm w-full px-8 ${visible ? 'pt-4' : 'py-4'}`}>
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
      </div>
      <div
        className={`${
          visible ? 'max-h-full pb-8' : 'max-h-0'
        } relative grid grid-cols-1 md:grid-cols-4 transition-all overflow-hidden`}
      >
        <div className="px-4">
          <GenreSearch
            containerClassName="pb-4"
            multiple
            placeholder={i('FETISH')}
            defaultValue={filter.fetishes}
            filterOverride={{ fetish: true }}
            onChange={genreIds => setFetishes(genreIds)}
            inputClassName="w-full"
          />
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
