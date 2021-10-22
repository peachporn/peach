import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import { MovieFilterDisplayQuery, MovieFilterDisplayQueryVariables } from '@peach/types';
import { MovieFilterContext } from '../../../context/movieFilter';
import { Icon } from '../../../components/icon';
import { FetishBubble } from '../../../components/fetishBubble';
import { GenreSearch } from '../../../components/genreSearch';
import { i } from '../../../i18n/i18n';
import { ActressSearch } from '../../../components/actressSearch';
import { WebsiteSearch } from '../../../components/websiteSearch';
import { movieFilterDisplayQuery } from '../queries/movieFilterDisplay.gql';
import { WebsiteCard } from '../../../components/websiteCard';
import { ActressCard } from '../../../components/actressCard';
import { GenreCard } from '../../../components/genreCard';
import { Checkbox } from '../../../components/checkbox';

export const MovieFilter: FunctionalComponent = () => {
  const [visible, setVisible] = useState(false);
  const { filter, isFiltered, setFetishes, setTitle, setActresses, setWebsites, setUntouched } =
    useContext(MovieFilterContext);

  const { data } = useQuery<MovieFilterDisplayQuery, MovieFilterDisplayQueryVariables>(
    movieFilterDisplayQuery,
    {
      variables: {
        genres: filter.fetishes,
        genreLimit: filter.fetishes?.length || 0,
        actresses: filter.actresses,
        actressLimit: filter.actresses?.length || 0,
        websites: filter.websites,
        websiteLimit: filter.websites?.length || 0,
      },
      skip: !isFiltered,
    },
  );

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
            value={filter.title}
            onKeyUp={e => {
              setTitle((e.target as HTMLInputElement).value);
            }}
          />
        </div>
        {isFiltered && !visible ? (
          <Fragment>
            {!data?.actresses.length && !data?.websites.length && !data?.genres.length ? null : (
              <div className="col-span-12 grid grid-rows-2h20 grid-cols-3 md:grid-cols-10 gap-4 px-4 py-2 text-xs">
                {(data?.actresses || []).map(a => (
                  <ActressCard className="row-span-2" noLabel actress={a} />
                ))}
                {(data?.websites || []).map(w => (
                  <WebsiteCard noLabel website={w} />
                ))}
                {(data?.genres || []).map(g => (
                  <GenreCard noLabel genre={g} />
                ))}
              </div>
            )}
          </Fragment>
        ) : null}
      </div>
      <div
        className={`${
          visible ? 'max-h-full pb-8' : 'max-h-0'
        } relative grid items-start grid-cols-1 md:grid-cols-4 gap-3 transition-all overflow-hidden`}
      >
        <div>
          <GenreSearch
            containerClassName="md:grid md:grid-cols-3"
            limit={6}
            multiple
            placeholder={i('FETISH')}
            defaultValue={filter.fetishes}
            filterOverride={{ fetish: true }}
            onChange={genreIds => setFetishes(genreIds)}
            inputClassName="w-full"
          />
        </div>
        <div>
          <WebsiteSearch
            limit={6}
            sliderClassName="md:grid md:grid-cols-2"
            onChange={websiteIds => setWebsites(websiteIds)}
            multiple
            placeholder={i('MOVIE_WEBSITE')}
            defaultValue={filter.websites}
            inputClassName="w-full"
          />
        </div>
        <div>
          <ActressSearch
            limit={6}
            sliderClassName="md:grid md:grid-cols-3"
            onChange={actressIds => setActresses(actressIds)}
            multiple
            placeholder={i('MOVIE_ACTRESSES')}
            defaultValue={filter.actresses}
            inputClassName="w-full"
          />
        </div>
        <div className="pt-2">
          <Checkbox.NoForm
            name="untouched"
            checked={filter.untouched || false}
            label={<span>{i('ONLY_UNTOUCHED')}</span>}
            onChange={checked => {
              setUntouched(checked ? true : undefined);
            }}
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
