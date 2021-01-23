import { Fragment, FunctionalComponent, h } from 'preact';
import { ActressCardFragment } from '@peach/types';

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
  const className = `w-full rounded shadow flex flex-col focus:outline-none ${classNameProp || ''}`;

  const children = (
    <Fragment>
      <img
        className="h-56 object-cover w-full rounded-t"
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
