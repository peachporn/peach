import { FunctionalComponent, h } from 'preact';
import { Image } from '../image';

type CoverScreencapsProps = {
  screencaps: {
    movieTitle: string;
    src: string;
  }[];
};

export const CoverScreencaps: FunctionalComponent<CoverScreencapsProps> = ({ screencaps }) => {
  const visibleScreencaps = screencaps.slice(0, screencaps.length - (screencaps.length % 3));

  return (
    <div className="grid grid-cols-3">
      {visibleScreencaps.map(({ movieTitle, src }) => (
        <Image
          className="filter-grayscale blend-multiply opacity-70 -z-1 min-w-full min-h-full object-cover"
          alt={movieTitle}
          src={src}
        />
      ))}
    </div>
  );
};
