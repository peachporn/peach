import { FunctionalComponent, h } from 'preact';
import { FetishBubbleFragment } from '@peach/types';
import { Image } from '../image';

type FetishBubbleProps = {
  genre: FetishBubbleFragment;
  className?: string;
  size?: number;
  onClick?: () => void;
};

export const FetishBubble: FunctionalComponent<FetishBubbleProps> = ({
  className,
  genre,
  onClick,
  size = 10,
}) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick || undefined}
    className={`flex flex-col items-center justify-center focus:outline-none ${className} focus:border-pink border-b-2 border-transparent`}
  >
    <Image alt={genre.name} className={`rounded-full w-${size} h-${size}`} src={genre.picture} />
    <span className="pt-1">{genre.name}</span>
  </div>
);
