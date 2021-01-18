import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { HomepageQuery } from '@peach/types';
import { homepageQuery } from './queries/homepage.gql';
import { i } from '../../i18n/i18n';
import { Slider, SliderItem } from '../../components/slider';
import { MovieCard } from '../../components/movieCard';
import { settingsRoute } from '../../utils/route';

export const Homepage: FunctionalComponent = () => {
  const { data } = useQuery<HomepageQuery>(homepageQuery);

  const movie = data?.randomMovies[0];
  const hasMovies = data?.recentMovies.length || data?.randomMovies.length;

  return (
    <Fragment>
      <div className="pt-24 pb-8 min-h-screen/2">
        <img className="m-auto rounded-full shadow-lg" alt="Peach Logo" src="/static/logo.png" />
        <h1 className="text-center m-auto text-white font-display text-5xl">Peach</h1>
      </div>
      <div className="bg-white px-8 py-8 shadow-lg">
        {!hasMovies ? (
          <Fragment>
            <h3 className="text-center text-lg">{i('HOMEPAGE_NO_MOVIES')}</h3>
            <span>
              {i('HOMEPAGE_GO_TO_SETTINGS1')}
              <Link className="text-pink" to={settingsRoute}>
                {i('HOMEPAGE_SETTINGS_PAGE')}
              </Link>
              {i('HOMEPAGE_GO_TO_SETTINGS2')}
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <h2 className="text-xl mb-2 mt-4">{i('RECENT_MOVIES')}</h2>
            <div className="-mx-8">
              <Slider>
                {(data?.recentMovies || []).map(m => (
                  <SliderItem>
                    <MovieCard movie={m} />
                  </SliderItem>
                ))}
              </Slider>
            </div>
            <h2 className="text-xl mb-2 mt-4">{i('RANDOM_MOVIES')}</h2>
            <div className="-mx-8">
              <Slider>
                {(data?.randomMovies || []).map(m => (
                  <SliderItem>
                    <MovieCard movie={m} />
                  </SliderItem>
                ))}
              </Slider>
            </div>
          </Fragment>
        )}
      </div>
      {!movie || !movie.coverPicture ? null : (
        <img
          className="absolute inset-0 blend-multiply filter-grayscale w-full -z-1 opacity-50 min-h-screen/2 max-h-full object-cover"
          src={movie.coverPicture?.src}
          alt={movie.title}
        />
      )}
    </Fragment>
  );
};
