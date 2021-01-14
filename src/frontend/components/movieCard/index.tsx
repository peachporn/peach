import { FunctionalComponent, h } from 'preact';

type MovieCardProps = {
  className?: string;
  movie: MovieCardFragment;
};
export const MovieCard: FunctionalComponent<MovieCardProps> = ({ movie, className }) => (
  <div className={`w-52 shadow-md rounded-md ${className}`}>
    {movie.coverPicture?.src && (
      <img className="w-full rounded-t-md" src={movie.coverPicture?.src} alt={movie.title} />
    )}
    <span className="block text-sm py-1 px-2">{movie.title}</span>
  </div>
);
