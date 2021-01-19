import { FunctionalComponent, h } from 'preact';
import { GenreCardFragment } from '@peach/types';
import { Image } from '../image';
import { colorCodeKinkiness } from '../../domain/genre';

type GenreCardProps = {
  genre: GenreCardFragment;
  className?: string;
  onClick?: () => void;
};

export const GenreCard: FunctionalComponent<GenreCardProps> = ({ className, genre, onClick }) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick || undefined}
    className={`flex flex-col rounded-md focus:outline-none shadow-sm ${className}`}
  >
    <Image alt={genre.name} className="w-full rounded-t-md" src={genre.picture} />
    <div className="flex justify-between bg-white text-sm p-1">
      <span>{genre.name}</span>
      <span
        className={`flex justify-center items-center text-xs text-white bg-${colorCodeKinkiness(
          genre.kinkiness,
        )} rounded-full w-5 h-5 font-bold text-shadow-md`}
      >
        {genre.kinkiness}
      </span>
    </div>
  </div>
);
