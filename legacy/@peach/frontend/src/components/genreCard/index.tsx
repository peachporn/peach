import { GenreCardFragment } from '@peach/types';
import { FunctionalComponent, h } from 'preact';
import { colorCodeKinkiness } from '../../domain/genre';
import { Image } from '../image';

type GenreCardProps = {
  genre: GenreCardFragment;
  className?: string;
  noLabel?: boolean;
  onClick?: () => void;
};

export const GenreCard: FunctionalComponent<GenreCardProps> = ({
  className,
  genre,
  onClick,
  noLabel,
}) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick || undefined}
    className={`w-full h-full flex flex-col rounded-md focus:outline-none ${
      noLabel ? '' : 'focus:border-pink border-b-2 border-transparent'
    } shadow-sm ${className || ''}`}
  >
    <Image
      alt={genre.name}
      className={`w-full h-full object-cover rounded-t ${noLabel ? 'rounded-b' : ''}`}
      src={genre.picture}
    />
    {noLabel ? null : (
      <div className="flex justify-between bg-white p-1">
        <span>{genre.name}</span>
        <span
          className={`flex justify-center items-center text-xs text-white bg-${colorCodeKinkiness(
            genre.kinkiness,
          )} rounded-full w-5 h-5 font-bold text-shadow-md`}
        >
          {genre.kinkiness}
        </span>
      </div>
    )}
  </div>
);
