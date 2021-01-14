import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';

import logo from 'url:../../assets/logo.png';
import { randomMoviesQuery } from './queries/randomMovie.gql';
import { RecentMovies } from './components/recentMovies';
import { i } from '../../i18n/i18n';
import { Slider, SliderItem } from '../../components/slider';
import { MovieCard } from '../../components/movieCard';

export const Homepage: FunctionalComponent = () => {
  const { data } = useQuery<RandomMoviesQuery>(randomMoviesQuery, {
    variables: {
      limit: 10,
    },
  });

  const movie = data?.movies[0];

  return (
    <Fragment>
      <div className="pt-24 pb-8 min-h-screen/2">
        <img className="m-auto rounded-full shadow-lg" alt="Peach Logo" src={logo} />
        <h1 className="text-center m-auto text-white font-display text-5xl">Peach</h1>
      </div>
      <div className="bg-white px-8 py-8 shadow-lg">
        <RecentMovies />
        <h2 className="text-xl mb-2 mt-4">{i('RANDOM_MOVIES')}</h2>
        <div className="-mx-8">
          <Slider>
            {(data?.movies || []).map(m => (
              <SliderItem>
                <MovieCard movie={m} />
              </SliderItem>
            ))}
          </Slider>
        </div>
      </div>
      {!movie || !movie.coverPicture ? null : (
        <img
          className="absolute inset-0 blend-multiply filter-grayscale w-full -z-1 opacity-50 min-h-screen/2 object-cover"
          src={movie.coverPicture?.src}
          alt={movie.title}
        />
      )}
    </Fragment>
  );
};
