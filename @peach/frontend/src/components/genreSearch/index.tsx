import { useQuery } from '@apollo/client';
import {
  FetishBubbleFragment,
  GenreFilter,
  GenreSearchQuery,
  GenreSearchQueryVariables,
} from '@peach/types';
import { Fragment, FunctionalComponent, h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { equals, uniq } from 'ramda';
import uniqBy from 'ramda/es/uniqBy';
import { debounce } from '../../utils/throttle';
import { usePrevious } from '../../utils/usePrevious';
import { FetishBubble } from '../fetishBubble';
import { genreSearchQuery } from './genreSearchQuery.gql';

type GenreSearchProps = {
  placeholder?: string;
  onChange: (id: number[]) => unknown;
  filterOverride?: Partial<GenreFilter>;

  multiple?: boolean;
  limit?: number;

  defaultValue?: number[];
  setValue?: number[];

  inputClassName?: string;
  containerClassName?: string;

  controlsSlot?: VNode;
};

export const GenreSearch: FunctionalComponent<GenreSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  setValue,
  placeholder,
  onChange,
  limit,
  controlsSlot,
  containerClassName,
  inputClassName,
}) => {
  const [genreIds, setGenreIds] = useState<number[]>(defaultValue || setValue || []);
  const [searchName, setSearchName] = useState<string>('');

  const previousSetValue = usePrevious(setValue);

  useEffect(() => {
    if (!setValue || equals(setValue, previousSetValue)) return;
    if (setValue.find(v => !genreIds.includes(v))) {
      setGenreIds(setValue);
    }
  }, [setValue]);

  useEffect(() => {
    onChange(genreIds);
  }, [genreIds]);

  const { data: selectedGenres } = useQuery<GenreSearchQuery, GenreSearchQueryVariables>(
    genreSearchQuery,
    {
      variables: { filter: { ids: genreIds }, limit: 100 },
      skip: !genreIds.length,
    },
  );

  const { data: searchedGenres } = useQuery<GenreSearchQuery, GenreSearchQueryVariables>(
    genreSearchQuery,
    {
      variables: {
        filter: {
          name: searchName,
          ...filterOverride,
        },
        limit: limit || 5,
      },
      skip: searchName.trim() === '',
    },
  );

  const submitGenre = (g: FetishBubbleFragment) => {
    console.log(g);
    if (multiple) {
      setGenreIds(
        genreIds.includes(g.id) ? genreIds.filter(id => id !== g.id) : uniq([...genreIds, g.id]),
      );
    } else {
      setGenreIds([g.id]);
    }
    setSearchName('');
  };

  const genres = uniqBy(
    g => g.id,
    [...(selectedGenres?.genres || []), ...(searchedGenres?.genres || [])],
  );

  return (
    <Fragment>
      <div className="relative">
        <input
          tabIndex={0}
          className={`input ${inputClassName || ''}`}
          placeholder={placeholder}
          value={searchName}
          onKeyUp={debounce((event: KeyboardEvent) => {
            if (event.key === 'Enter' && searchedGenres?.genres.length === 1) {
              submitGenre(searchedGenres.genres[0]);
              return;
            }
            setSearchName((event.target as HTMLInputElement)?.value);
          }, 200)}
        />
        <div className="absolute top-1 right-1 text-gray-500">{controlsSlot}</div>
      </div>
      <div
        className={`flex gap-4 mt-4 h-20 md:h-full items-start text-center overflow-x-auto ${
          containerClassName || ''
        }`}
      >
        {genres.map(g => (
          <FetishBubble
            key={g.id}
            className={genreIds.includes(g.id) ? '' : 'opacity-70'}
            onClick={() => {
              submitGenre(g);
            }}
            genre={g}
          />
        ))}
      </div>
    </Fragment>
  );
};
