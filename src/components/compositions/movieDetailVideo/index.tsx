import { FunctionalComponent, h } from 'preact';
import { Video } from '../../components/video';

export type MovieDetailVideoProps = {
  movie: Pick<Movie, 'url'>;
};

export const MovieDetailVideo: FunctionalComponent<MovieDetailVideoProps> = ({ movie }) => (
  <section className="movie-detail-video">
    <Video src={{ 'video/mp4': movie.url }} />
  </section>
);
