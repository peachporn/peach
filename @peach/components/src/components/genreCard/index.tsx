import { JSX, Fragment, FunctionalComponent, h, VNode } from 'preact';
import logo from '../../static/logo.png';
import { Image } from '../image';

export type GenreCardProps = {
  genre: GenreCardGenre;
  className?: string;
  url?: string;
  onClick?: OnEvent;
  onKeyup?: JSX.KeyboardEventHandler<HTMLElement>;
  buttonSlot?: VNode;
  focus?: boolean;
  shadow?: boolean;
  headline?: string;
  categorySlot?: JSX.Element | null;
  appearance?: ('small' | 'white')[];
};

export type GenreCardGenre = {
  id: number;
  name: string;
  category?: string;
  picture?: string;
};

export const GenreCard: FunctionalComponent<GenreCardProps> = ({
  genre: { name, category, picture },
  className: classNameProp,
  onClick,
  onKeyup,
  url,
  buttonSlot,
  focus,
  shadow,
  headline,
  categorySlot,
  appearance = [],
}) => {
  const className = `genre-card ${classNameProp || ''} ${
    focus ? 'genre-card--focus' : ''
  } ${appearance.map(a => `genre-card--${a}`).join(' ')} ${
    shadow ? 'genre-card--shadow' : ''
  }`.trim();

  const children = (
    <Fragment>
      <Image className="genre-card__image" src={picture || logo} alt={name} placeholder={logo} />
      <span className="genre-card__name">{headline || name}</span>
      {categorySlot !== undefined
        ? { categorySlot }
        : category && <span className="genre-card__category">{category}</span>}
      {buttonSlot ? <div className="genre-card__button-slot">{buttonSlot}</div> : null}
    </Fragment>
  );

  return url ? (
    <a
      href={url}
      onClick={onClick || (() => {})}
      onKeyUp={onKeyup || (() => {})}
      className={className}
    >
      {children}
    </a>
  ) : (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick || (() => {})}
      onKeyUp={onKeyup || (() => {})}
      className={className}
    >
      {children}
    </div>
  );
};

export type GenreCardGridProps = {
  appearance?: 'white';
};

export const GenreCardGrid: FunctionalComponent<GenreCardGridProps> = ({
  appearance,
  children,
}) => (
  <div className={`genre-card-grid ${appearance ? `genre-card-grid--${appearance}` : ''}`}>
    {children}
  </div>
);

export const GenreCardList: FunctionalComponent<{ className?: string }> = ({
  children,
  className,
}) => <div className={`genre-card-list ${className || ''}`}>{children}</div>;
