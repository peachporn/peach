import { Fragment, FunctionalComponent, h } from 'preact';
import { ActressCardFragment } from '@peach/types';
import { Image } from '../image';

export type ActressCardProps = {
  actress: ActressCardFragment;
  url?: string;
  className?: string;
  noLabel?: boolean;
  onClick?: (e: Event) => void;
};

export const ActressCard: FunctionalComponent<ActressCardProps> = ({
  actress,
  className: classNameProp,
  onClick,
  noLabel,
  url,
}) => {
  const className = `w-full h-full rounded shadow relative flex flex-col justify-between focus:outline-none ${
    noLabel ? '' : 'focus:border-pink border-b-2 border-transparent'
  } ${classNameProp || ''}`;

  const children = (
    <Fragment>
      <Image
        className={`object-cover w-full h-full rounded-t ${noLabel ? 'rounded-b' : ''}`}
        src={actress.picture}
        alt={actress.name}
      />
      {noLabel ? null : <span className="bg-white p-2">{actress.name}</span>}
    </Fragment>
  );

  return url ? (
    <a
      href={url}
      onClick={e => {
        if (!onClick) return;
        onClick(e);
      }}
      className={className}
    >
      {children}
    </a>
  ) : (
    <div tabIndex={0} role="button" onClick={onClick || (() => {})} className={className}>
      {children}
    </div>
  );
};
