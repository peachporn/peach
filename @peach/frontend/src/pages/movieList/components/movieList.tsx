import { h, FunctionalComponent, Fragment } from 'preact';

export type MovieListViewMovie = {
  title: string;
  link: string;
  screencaps: {
    src: string;
    cover: boolean;
    index: number;
  }[];
};

export type MovieListProps = {
  movies: MovieListViewMovie[];
};

const MovieListItem: FunctionalComponent<{ movie: MovieListViewMovie }> = ({
  movie: { title, screencaps, link },
}) => (
  <li className="movie-item">
    <h3 className="movie-item__title">
      <span className="movie-item__title-text">{title}</span>
    </h3>
    <a href={link}>
      <div className="movie-item__screencaps">
        {screencaps.map(screencap => (
          <Fragment>
            <span className="movie-item__screencaps-hover-area" />
            <img
              alt={title}
              src={screencap.src}
              className={`movie-item__screencaps-pic ${
                screencap.cover ? 'movie-item__screencaps-pic--default' : ''
              }`}
            />
          </Fragment>
        ))}
      </div>
    </a>
  </li>
);

export const MovieList: FunctionalComponent<MovieListProps> = ({ movies }) => (
  <ul className="movie-list">
    {movies.map(movie => (
      <MovieListItem movie={movie} key={movie.title} />
    ))}
  </ul>
);
