import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { recentMoviesQuery } from '../queries/recentMovies.gql';
import { i } from '../../../i18n/i18n';
import { MovieCard } from '../../../components/movieCard';
import { Slider, SliderItem } from '../../../components/slider';

export const RecentMovies: FunctionalComponent = () => {
  const { data } = useQuery<RecentMoviesQuery>(recentMoviesQuery);

  return (
    <Fragment>
      <h2 className="text-xl mb-2">{i('RECENT_MOVIES')}</h2>
      <div className="-mx-8">
        <Slider>
          {(data?.movies || []).map(m => (
            <SliderItem>
              <MovieCard className="snap-align-start" movie={m} />
            </SliderItem>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
};
