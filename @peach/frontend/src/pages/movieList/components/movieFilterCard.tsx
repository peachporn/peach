import { MovieFilterFragment } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { Icon } from '../../../components/icon';
import { MovieFilterContext } from '../../../context/movieFilter';
import { i } from '../../../i18n/i18n';
import { actressDetailRoute, genreDetailRoute } from '../../../utils/route';

type MovieFilterCardProps = {
  movieFilter: MovieFilterFragment;
  onClick?: () => void;
};

const MovieFilterIcon: FunctionalComponent<MovieFilterCardProps> = ({ movieFilter }) => (
  <Icon
    className={'text-md text-pink'}
    icon={
      movieFilter.__typename === 'ActressMovieFilter'
        ? 'person_pin'
        : movieFilter.__typename === 'FetishMovieFilter'
        ? 'loyalty'
        : movieFilter.__typename === 'WebsiteMovieFilter'
        ? 'language'
        : movieFilter.__typename === 'UntouchedMovieFilter'
        ? 'loyalty'
        : movieFilter.__typename === 'TitleMovieFilter'
        ? 'title'
        : 'error'
    }
  />
);

const MovieFilterText: FunctionalComponent<MovieFilterCardProps> = ({ movieFilter }) => (
  <Fragment>
    {movieFilter.__typename === 'ActressMovieFilter'
      ? movieFilter.actress.name
      : movieFilter.__typename === 'FetishMovieFilter'
      ? movieFilter.genre.name
      : movieFilter.__typename === 'WebsiteMovieFilter'
      ? movieFilter.website.name
      : movieFilter.__typename === 'UntouchedMovieFilter'
      ? i('MOVIE_FILTERCARD_UNTOUCHED')
      : movieFilter.__typename === 'TitleMovieFilter'
      ? movieFilter.title
      : ''}
  </Fragment>
);

const MovieFilterCTA: FunctionalComponent<MovieFilterCardProps> = ({ movieFilter }) => {
  const history = useHistory();
  return (
    <Fragment>
      {movieFilter.__typename === 'ActressMovieFilter' ? (
        <button
          className={'flex items-center justify-self-end'}
          onClick={e => {
            e.stopPropagation();
            history.push(actressDetailRoute(movieFilter.actress.id));
          }}
        >
          <Icon icon={'info'} className={'text-gray-200'} />
        </button>
      ) : movieFilter.__typename === 'FetishMovieFilter' ? (
        <button
          className={'flex items-center'}
          onClick={e => {
            e.stopPropagation();
            history.push(genreDetailRoute(movieFilter.genre.id));
          }}
        >
          <Icon icon={'info'} className={'text-gray-200'} />
        </button>
      ) : movieFilter.__typename === 'WebsiteMovieFilter' ? (
        <button
          className={'flex items-center'}
          onClick={e => {
            e.stopPropagation();
            history.push(genreDetailRoute(movieFilter.website.id));
          }}
        >
          <Icon icon={'info'} className={'text-gray-200'} />
        </button>
      ) : movieFilter.__typename === 'UntouchedMovieFilter' ? null : movieFilter.__typename ===
        'TitleMovieFilter' ? null : (
        ''
      )}
    </Fragment>
  );
};

export const MovieFilterCard: FunctionalComponent<MovieFilterCardProps> = ({
  onClick,
  movieFilter,
}) => {
  const { filterInput, setTitle, setActresses, setFetishes, setUntouched, setWebsites } =
    useContext(MovieFilterContext);

  const addToFilters = () => {
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
    <button
      onClick={onClick ?? addToFilters}
      className="p-2 justify-between rounded shadow focus:border-pink border-b-2 border-transparent focus:outline-none relative cursor-pointer flex items-center gap-1"
    >
      <div className={'flex items-center gap-2'}>
        <MovieFilterIcon movieFilter={movieFilter} />
        <MovieFilterText movieFilter={movieFilter} />
      </div>

      <MovieFilterCTA movieFilter={movieFilter} />
    </button>
  );
};
