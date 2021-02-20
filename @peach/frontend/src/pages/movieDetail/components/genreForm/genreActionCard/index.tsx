import { FunctionalComponent, h } from 'preact';
import { GenreActionCardFragment } from '@peach/types';
import { Image } from '../../../../../components/image';

type GenreActionCardProps = {
  genre: GenreActionCardFragment;
  headline?: string;
  className?: string;
  onClick?: () => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  focus?: boolean;
};

export const GenreActionCard: FunctionalComponent<GenreActionCardProps> = ({
  className,
  genre,
  onClick,
  onKeyUp,
  focus,
  headline,
}) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick || undefined}
    onKeyUp={onKeyUp || undefined}
    className={`flex flex-col rounded-md focus:outline-none shadow-sm focus:border-pink border-b-2
    ${className}`}
  >
    <Image alt={genre.name} className="w-full rounded-t-md" src={genre.picture} />
    <div
      className={`flex justify-between bg-white text-sm p-1 rounded-b-md ${
        focus ? 'border-b-2 border-pink' : ''
      }`}
    >
      <span>{headline || genre.name}</span>
    </div>
  </div>
);
