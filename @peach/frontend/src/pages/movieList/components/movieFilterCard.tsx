import {
  MovieFilter_ActressMovieFilter_Fragment,
  MovieFilter_FetishMovieFilter_Fragment,
  MovieFilter_TitleMovieFilter_Fragment,
  MovieFilter_UntouchedMovieFilter_Fragment,
  MovieFilter_WebsiteMovieFilter_Fragment,
  MovieFilterFragment,
} from '@peach/types';
import { FunctionalComponent } from 'preact';
import { FC } from 'preact/compat';
import { useContext } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { FilterCard } from '../../../components/filterCard';
import { Icon } from '../../../components/icon';
import { MovieFilterContext } from '../../../context/movieFilter';
import { i } from '../../../i18n/i18n';
import { actressDetailRoute, genreDetailRoute } from '../../../utils/route';

type MovieFilterCardProps = {
  movieFilter: MovieFilterFragment;
  onClick?: () => void;
};

const UntouchedFilterCard: FC<{ movieFilter: MovieFilter_UntouchedMovieFilter_Fragment }> =
  ({}) => {
    const history = useHistory();
    const { filterInput, setUntouched } = useContext(MovieFilterContext);

    return (
      <FilterCard
        onClick={() => {
          setUntouched(!filterInput.untouched);
        }}
        iconSlot={<Icon className={'text-md text-pink'} icon={'loyalty'} />}
      >
        {i('MOVIE_FILTERCARD_UNTOUCHED')}
      </FilterCard>
    );
  };

const WebsiteFilterCard: FC<{ movieFilter: MovieFilter_WebsiteMovieFilter_Fragment }> = ({
  movieFilter,
}) => {
  const history = useHistory();
  const { filterInput, setWebsites } = useContext(MovieFilterContext);

  return (
    <FilterCard
      onClick={() => {
        setWebsites([...(filterInput.websites ?? []), movieFilter.website.id]);
      }}
      descriptionSlot={<>{i('MOVIE_FILTERCARD_WEBSITE')}</>}
      ctaSlot={
        <button
          className={'flex items-center'}
          onClick={e => {
            e.stopPropagation();
            history.push(genreDetailRoute(movieFilter.website.id));
          }}
        >
          <Icon icon={'info'} className={'text-gray-200'} />
        </button>
      }
      iconSlot={<Icon className={'text-md text-pink'} icon={'language'} />}
    >
      {movieFilter.website.name}
    </FilterCard>
  );
};

const FetishFilterCard: FC<{ movieFilter: MovieFilter_FetishMovieFilter_Fragment }> = ({
  movieFilter,
}) => {
  const history = useHistory();
  const { filterInput, setFetishes } = useContext(MovieFilterContext);

  return (
    <FilterCard
      onClick={() => {
        setFetishes([...(filterInput.fetishes ?? []), movieFilter.genre.id]);
      }}
      descriptionSlot={<>{i('MOVIE_FILTERCARD_FETISH')}</>}
      ctaSlot={
        <button
          className={'flex items-center'}
          onClick={e => {
            e.stopPropagation();
            history.push(genreDetailRoute(movieFilter.genre.id));
          }}
        >
          <Icon icon={'info'} className={'text-gray-200'} />
        </button>
      }
      iconSlot={<Icon className={'text-md text-pink'} icon={'loyalty'} />}
    >
      {movieFilter.genre.name}
    </FilterCard>
  );
};

const ActressFilterCard: FC<{ movieFilter: MovieFilter_ActressMovieFilter_Fragment }> = ({
  movieFilter,
}) => {
  const history = useHistory();
  const { filterInput, setActresses } = useContext(MovieFilterContext);

  return (
    <FilterCard
      onClick={() => {
        setActresses([...(filterInput.actresses ?? []), movieFilter.actress.id]);
      }}
      descriptionSlot={<>{i('MOVIE_FILTERCARD_ACTRESS')}</>}
      ctaSlot={
        <button
          className={'flex items-center justify-self-end'}
          onClick={e => {
            e.stopPropagation();
            history.push(actressDetailRoute(movieFilter.actress.id));
          }}
        >
          <Icon icon={'info'} className={'text-gray-200'} />
        </button>
      }
      iconSlot={<Icon className={'text-md text-pink'} icon={'person_pin'} />}
    >
      {movieFilter.actress?.name}
    </FilterCard>
  );
};

const TitleFilterCard: FC<{ movieFilter: MovieFilter_TitleMovieFilter_Fragment }> = ({
  movieFilter,
}) => {
  const { filterInput, setTitle } = useContext(MovieFilterContext);

  return (
    <FilterCard
      onClick={() => {
        setTitle(filterInput.title ? undefined : movieFilter.title);
      }}
      descriptionSlot={<>{i('MOVIE_FILTERCARD_TITLE')}</>}
      iconSlot={<Icon className={'text-md text-pink'} icon={'title'} />}
    >
      {movieFilter.title}
    </FilterCard>
  );
};

export const MovieFilterCard: FunctionalComponent<MovieFilterCardProps> = ({ movieFilter }) =>
  movieFilter.__typename === 'TitleMovieFilter' ? (
    <TitleFilterCard movieFilter={movieFilter} />
  ) : movieFilter.__typename === 'ActressMovieFilter' ? (
    <ActressFilterCard movieFilter={movieFilter} />
  ) : movieFilter.__typename === 'UntouchedMovieFilter' ? (
    <UntouchedFilterCard movieFilter={movieFilter} />
  ) : movieFilter.__typename === 'FetishMovieFilter' ? (
    <FetishFilterCard movieFilter={movieFilter} />
  ) : movieFilter.__typename === 'WebsiteMovieFilter' ? (
    <WebsiteFilterCard movieFilter={movieFilter} />
  ) : null;
