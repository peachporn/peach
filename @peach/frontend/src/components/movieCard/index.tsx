import { FunctionalComponent, h } from 'preact';
import { NavLink } from 'react-router-dom';
import { MovieCardFragment } from '@peach/types';

import { movieDetailRoute } from '../../utils/route';
import { Image } from '../image';

type MovieCardProps = {
  className?: string;
  movie: MovieCardFragment;
  noWidth?: boolean;
};
export const MovieCard: FunctionalComponent<MovieCardProps> = ({
  movie,
  className,
  noWidth = false,
}) => (
  <NavLink
    to={movieDetailRoute(movie.id)}
    className={`block ${noWidth ? '' : 'w-full'} shadow-md rounded-md ${className || ''}`}
  >
    <Image
      className="w-full rounded-t-md md:h-48 object-cover"
      src={movie.coverPicture?.src || ''}
      alt={movie.title}
    />
    <span className="block text-sm py-1 px-2 overflow-x-hidden break-all">{movie.title}</span>
  </NavLink>
);
