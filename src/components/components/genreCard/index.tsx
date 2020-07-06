import { Fragment, FunctionalComponent, h } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type GenreCardProps = {
  name: string;
  category?: string;
  className?: string;
  imageUrl?: string;
  url?: string;
  onClick?: OnEvent;
};

export const GenreCard: FunctionalComponent<GenreCardProps> = ({
  name,
  category,
  className: classNameProp,
  imageUrl,
  onClick,
  url,
}) => {
  const className = `genre-card ${classNameProp || ''}`.trim();

  const children = (
    <Fragment>
      <Image className="genre-card__image" src={imageUrl || logo} alt={name} placeholder={logo} />
      <span className="genre-card__name">{name}</span>
      {category && <span className="genre-card__category">{category}</span>}
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

export const GenreCardGrid: FunctionalComponent = ({ children }) => (
  <div className="genre-card-grid">{children}</div>
);
