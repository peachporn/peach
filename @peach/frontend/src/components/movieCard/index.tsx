import { FunctionalComponent, h } from 'preact';
import { NavLink } from 'react-router-dom';
import { MovieCardFragment } from '@peach/types';

import { movieDetailRoute } from '../../utils/route';

type MovieCardProps = {
  className?: string;
  movie: MovieCardFragment;
};
export const MovieCard: FunctionalComponent<MovieCardProps> = ({ movie, className }) => (
  <NavLink
    to={movieDetailRoute(movie.id)}
    className={`block w-52 md:w-72 shadow-md rounded-md ${className}`}
  >
    {movie.coverPicture?.src && (
      <img className="w-full rounded-t-md" src={movie.coverPicture?.src} alt={movie.title} />
    )}
    <span className="block text-sm py-1 px-2">{movie.title}</span>
  </NavLink>
);
