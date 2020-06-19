import { FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type ActressCardProps = {
  name: string;
  imageUrl?: string;
  onClick?: OnEvent;
  focus?: boolean;
  buttonSlot?: VNode;
};

export const ActressCard: FunctionalComponent<ActressCardProps> = ({
  name,
  imageUrl,
  focus = false,
  onClick,
  buttonSlot,
}) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick || (() => {})}
    className={`actress-card ${focus ? 'actress-card--focus' : ''}`}
  >
    <Image src={imageUrl || logo} alt={name} placeholder={logo} />
    <span>{name}</span>
    <div className="actress-card__button-slot">{buttonSlot || null}</div>
  </div>
);

export const ActressCardList: FunctionalComponent = ({ children }) => (
  <div className="actress-card-list">{children}</div>
);
