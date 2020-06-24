import { Fragment, FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type ActressCardProps = {
  name: string;
  imageUrl?: string;
  url?: string;
  onClick?: OnEvent;
  focus?: boolean;
  shadow?: boolean;
  buttonSlot?: VNode;
  noName?: boolean;
};

export const ActressCard: FunctionalComponent<ActressCardProps> = ({
  name,
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
  }`;

  const children = (
    <Fragment>
      <Image src={imageUrl || logo} alt={name} placeholder={logo} />
      {noName ? null : <span>{name}</span>}
      <div className="actress-card__button-slot">{buttonSlot || null}</div>
    </Fragment>
  );

  return url ? (
    <a href={url} onClick={onClick || (() => {})} className={className}>
      {children}
    </a>
  ) : (
    <div tabIndex={0} role="button" onClick={onClick || (() => {})} className={className}>
      {children}
    </div>
  );
};

export const ActressCardList: FunctionalComponent = ({ children }) => (
  <div className="actress-card-list">{children}</div>
);

export const ActressCardGrid: FunctionalComponent = ({ children }) => (
  <div className="actress-card-grid">{children}</div>
);
