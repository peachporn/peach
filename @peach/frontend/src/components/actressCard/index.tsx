import { Fragment, FunctionalComponent, h } from 'preact';
import { ActressCardFragment } from '@peach/types';
import { Image } from '../image';

export type ActressCardProps = {
  actress: ActressCardFragment;
  url?: string;
  className?: string;
  onClick?: (e: Event) => void;
};

export const ActressCard: FunctionalComponent<ActressCardProps> = ({
  actress,
  className: classNameProp,
  onClick,
  url,
}) => {
  const className = `w-full rounded shadow relative flex flex-col justify-between focus:outline-none ${
    classNameProp || ''
  }`;

  const children = (
    <Fragment>
      <Image
        className="object-cover w-full h-full rounded-t"
        src={actress.picture}
        alt={actress.name}
      />
      <span className="bg-white p-2">{actress.name}</span>
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
