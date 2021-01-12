import { FunctionalComponent, h } from 'preact';
import { Backdrop, Headline1, Headline2 } from '../../../../components';
import { movieDetailRoute } from '../../../utils/route';
import { i } from '../../../i18n/i18n';

export type HomeProps = {
  movie?: Pick<Movie, 'id' | 'screencaps' | 'title'>;
};

export const Home: FunctionalComponent<HomeProps> = ({ movie }) => (
  <section className="home">
    {!movie ? null : <Backdrop src={movie.screencaps.find(s => s.cover)?.src!} alt={movie.title} />}
    <a className="home__headline" href="/movies">
      <Headline1>Peach</Headline1>
      <Headline2>– the porn organizer</Headline2>
    </a>
    {!movie ? null : (
      <a href={movieDetailRoute(movie.id)} className="home__movie-link">
        {i('HOME_COVER')}
        <br />
        {movie.title}
      </a>
    )}
  </section>
);
