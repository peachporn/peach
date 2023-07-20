import { useQuery } from '@apollo/client';
import {
  MovieFilterDisplayQuery,
  MovieFilterDisplayQueryVariables,
  MovieFilterFragment,
  MovieFiltersQuery,
  MovieFiltersQueryVariables,
} from '@peach/types';
import { FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ActressCard } from '../../../components/actressCard';
import { GenreCard } from '../../../components/genreCard';
import { Icon } from '../../../components/icon';
import { WebsiteCard } from '../../../components/websiteCard';
import { MovieFilterContext } from '../../../context/movieFilter';
import { i } from '../../../i18n/i18n';
import { debounce } from '../../../utils/throttle';
import { movieFilterDisplayQuery } from '../queries/movieFilterDisplay.gql';
import { movieFiltersQuery } from '../queries/movieFilters.gql';
import { MovieFilterCard } from './movieFilterCard';

export const MovieFilter: FunctionalComponent = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(true);
  const {
    filterInput,
    isFiltered,
    setActresses,
    setFetishes,
    setWebsites,
    setTitle,
    setUntouched,
  } = useContext(MovieFilterContext);

  const { data: displayData } = useQuery<MovieFilterDisplayQuery, MovieFilterDisplayQueryVariables>(
    movieFilterDisplayQuery,
    {
      variables: {
        genres: filterInput.fetishes,
        genreLimit: filterInput.fetishes?.length || 0,
        actresses: filterInput.actresses,
        actressLimit: filterInput.actresses?.length || 0,
        websites: filterInput.websites,
        websiteLimit: filterInput.websites?.length || 0,
      },
      skip: !isFiltered,
    },
  );

  useEffect(() => {
    setQuery('');
    setFocused(false);
  }, [filterInput]);

  const { data: filtersData } = useQuery<MovieFiltersQuery, MovieFiltersQueryVariables>(
    movieFiltersQuery,
    {
      variables: {
        query,
      },
    },
  );

  const noFiltersSelected =
    !displayData?.actresses.actresses.length &&
    !displayData?.websites.websites.length &&
    !displayData?.genres.genres.length &&
    !filterInput.untouched &&
    !filterInput.title;

  const debouncedSetQuery = debounce((e: Event) => {
    setQuery((e.target as HTMLInputElement).value);
  }, 250);

  const addToFilters = (movieFilter: MovieFilterFragment) => {
    if (movieFilter.__typename === 'ActressMovieFilter') {
      setActresses([...(filterInput.actresses ?? []), movieFilter.actress.id]);
    }
    if (movieFilter.__typename === 'FetishMovieFilter') {
      setFetishes([...(filterInput.fetishes ?? []), movieFilter.genre.id]);
    }
    if (movieFilter.__typename === 'WebsiteMovieFilter') {
      setWebsites([...(filterInput.websites ?? []), movieFilter.website.id]);
    }
    if (movieFilter.__typename === 'UntouchedMovieFilter') {
      setUntouched(!filterInput.untouched);
    }
    if (movieFilter.__typename === 'TitleMovieFilter') {
      setTitle(movieFilter.title);
    }
  };

  return (
    <div className={`bg-white shadow w-full px-8 pt-4`}>
      <div>
        <div className="place-items-center flex rounded-full p-2 focus:outline-none bg-gray-50 relative">
          <input
            className="input border-b-0 bg-gray-50 w-full"
            placeholder={i('MOVIE_FILTER_INPUT')}
            value={query}
            onFocus={() => {
              setFocused(true);
            }}
            onKeyUp={(e: KeyboardEvent) => {
              if (e.key === 'Enter' && filtersData?.movieFilters.length === 1) {
                return addToFilters(filtersData.movieFilters[0]);
              }
              return debouncedSetQuery(e);
            }}
          />
          <div className="absolute bottom-1.5 right-2 text-gray-500">
            {!focused ? null : (
              <Icon
                icon={'close'}
                onClick={() => {
                  setFocused(false);
                }}
              />
            )}
          </div>
        </div>
        {!focused ? null : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full p-4 min-h-32">
            {filtersData?.movieFilters.map(filter => (
              <MovieFilterCard movieFilter={filter} />
            ))}
          </div>
        )}
        {noFiltersSelected ? null : (
          <div className="col-span-12 grid grid-cols-3 md:grid-cols-8 gap-4 px-4 py-2 text-xs">
            {(displayData?.actresses.actresses || []).map(a => (
              <ActressCard
                className="row-span-2 col-span-2"
                actress={a}
                onClick={() => {
                  setActresses((filterInput.actresses ?? []).filter(input => input !== a.id));
                }}
              />
            ))}
            {(displayData?.websites.websites || []).map(w => (
              <WebsiteCard
                website={w}
                onClick={() => {
                  setWebsites((filterInput.websites ?? []).filter(input => input !== w.id));
                }}
              />
            ))}
            {(displayData?.genres.genres || []).map(g => (
              <GenreCard
                genre={g}
                onClick={() => {
                  setFetishes((filterInput.fetishes ?? []).filter(input => input !== g.id));
                }}
              />
            ))}
            {!filterInput.untouched ? null : (
              <div className={'col-span-4 md:col-span-1 grid grid-cols-1'}>
                <MovieFilterCard
                  movieFilter={{ __typename: 'UntouchedMovieFilter', untouched: true }}
                />
              </div>
            )}
            {!filterInput.title ? null : (
              <div className={'col-span-4 md:col-span-1 grid grid-cols-1'}>
                <MovieFilterCard
                  movieFilter={{ __typename: 'TitleMovieFilter', title: filterInput.title }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
