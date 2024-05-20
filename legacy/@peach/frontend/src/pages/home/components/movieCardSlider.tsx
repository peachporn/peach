import { Fragment, FunctionalComponent, h } from 'preact';
import { MovieCardFragment } from '@peach/types';
import { Slider, SliderItem } from '../../../components/slider';
import { MovieCard } from '../../../components/movieCard';

type MovieCardSliderProps = {
  headline: string;
  movies: MovieCardFragment[];
};

export const MovieCardSlider: FunctionalComponent<MovieCardSliderProps> = ({ headline, movies }) =>
  movies.length === 0 ? null : (
    <Fragment>
      <h2 className="text-xl mb-2 mt-4">{headline}</h2>
      <div className="-mx-8">
        <Slider className="md:grid-cols-5">
          {movies.map(m => (
            <SliderItem>
              <MovieCard noWidth className="w-52 md:w-full" movie={m} />
            </SliderItem>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
