import { Fragment, FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';

export type ActressCardProps = {
  name: string;
  className?: string;
  imageUrl?: string;
  url?: string;
  onClick?: (e: Event) => void;
  focus?: boolean;
  shadow?: boolean;
  buttonSlot?: VNode;
  noName?: boolean;
};

export const ActressCard: FunctionalComponent<ActressCardProps> = ({
  name,
  className: classNameProp,
  imageUrl,
  focus = false,
  onClick,
  shadow,
  url,
  buttonSlot,
  noName,
}) => {
  const className = `actress-card ${focus ? 'actress-card--focus' : ''} ${
    shadow ? 'actress-card--shadow' : ''
  } ${classNameProp || ''}`.trim();

  const children = (
    <Fragment>
      <Image src={imageUrl} alt={name} />
      {noName ? null : <span>{name}</span>}
      <div className="actress-card__button-slot">{buttonSlot || null}</div>
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
