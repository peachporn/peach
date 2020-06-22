import { h, FunctionalComponent, Fragment } from 'preact';
import { Icon } from '../../components/icon';
import { Pagination } from '../../components/pagination';

export type MovieListMovie = {
  title: string;
  link: string;
  fresh: boolean;
  screencaps: string[];
  cover: number;
};

export type MovieListProps = {
  movies: MovieListMovie[];
};

const MovieListItem: FunctionalComponent<{ movie: MovieListMovie }> = ({
  movie: { title, cover, screencaps, fresh, link },
}) => (
  <li className="movie-item">
    <h3 className="movie-item__title">
      <span className="movie-item__title-text">
        {fresh ? '* ' : ''}
        {title}
      </span>
      <a className="movie-item__title-link" href={link}>
        <Icon icon="arrow_forward" />
      </a>
    </h3>
    <div className="movie-item__screencaps">
      {screencaps.map((screencap, i) => (
        <Fragment>
          <a
            aria-label={`Screencap #${i + 1}`}
            href={link}
            className="movie-item__screencaps-hover-area"
          />
          <img
            alt={title}
            src={screencap}
            className={`movie-item__screencaps-pic ${
              cover === i ? 'movie-item__screencaps-pic--default' : ''
            }`}
          />
        </Fragment>
      ))}
    </div>
  </li>
);

export const MovieList: FunctionalComponent<MovieListProps> = ({ movies }) => (
  <ul className="movie-list">
    {movies.map(movie => (
      <MovieListItem movie={movie} key={movie.title} />
    ))}
  </ul>
);
