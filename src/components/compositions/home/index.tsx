import { FunctionalComponent, h } from 'preact';
import { Backdrop } from '../../components/backdrop';
import { Headline1 } from '../../components/headline';

export type HomeProps = {
  movie?: Pick<Movie, 'screencaps' | 'coverIndex' | 'title'>;
};

export const Home: FunctionalComponent<HomeProps> = ({ movie }) => (
  <section className="home">
    {!movie ? null : <Backdrop src={movie.screencaps[movie.coverIndex]} alt={movie.title} />}
    <Headline1>Peach</Headline1>
  </section>
);
