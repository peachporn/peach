import { JSX, Fragment, FunctionalComponent, h, VNode } from 'preact';
import logo from 'url:../../static/logo.png';
import { Image } from '../image';

export type GenreClipProps = {
  genre: GenreClipGenre;
  className?: string;
  onDblClick?: JSX.MouseEventHandler<HTMLElement>;
  onClick?: JSX.MouseEventHandler<HTMLElement>;
  onKeyup?: JSX.KeyboardEventHandler<HTMLElement>;
  interactionSlot?: VNode;
  descriptionSlot?: VNode;
  descriptionSlotPermanent?: boolean;
  focus?: boolean;
  shadow?: boolean;
  style?: Record<string, string>;
  appearance?: 'tiny' | 'large';
  url?: string;
};

export type GenreClipGenre = {
  id: number;
  name: string;
  category?: string;
  picture?: string;
};

export const GenreClip: FunctionalComponent<GenreClipProps> = ({
  genre: { name, picture },
  className: classNameProp,
  appearance,
  onDblClick,
  onClick,
  onKeyup,
  interactionSlot,
  descriptionSlot,
  descriptionSlotPermanent,
  focus,
  style,
  shadow,
  url,
  children: propChildren,
}) => {
  const className = `genre-clip ${classNameProp || ''} ${focus ? 'genre-clip--focus' : ''}
  ${appearance ? `genre-clip--${appearance}` : ''}
  ${shadow ? 'genre-clip--shadow' : ''}
  ${descriptionSlot || interactionSlot ? 'genre-clip--with-slot' : ''}
  ${!propChildren ? 'genre-clip--no-child' : ''}
  `
    .trim()
    .replace('\n', '');

  const children = (
    <Fragment>
      <Image className="genre-clip__image" src={picture || logo} alt={name} placeholder={logo} />
      {descriptionSlot ? (
        <div
          className={`genre-clip__description-slot ${
            descriptionSlotPermanent ? 'genre-clip__description-slot--permanent' : ''
          }`}
        >
          {descriptionSlot}
        </div>
      ) : null}
      {interactionSlot ? (
        <div className="genre-clip__interaction-slot">{interactionSlot}</div>
      ) : null}
      <div className="genre-clip__children">{propChildren}</div>
    </Fragment>
  );

  return url ? (
    <a
      style={style || {}}
      href={url}
      onClick={onClick || (() => {})}
      onDblClick={onDblClick || (() => {})}
      onKeyUp={onKeyup || (() => {})}
      className={className}
    >
      {children}
    </a>
  ) : (
    <div
      style={style || {}}
      tabIndex={0}
      role="button"
      onClick={onClick || (() => {})}
      onDblClick={onDblClick || (() => {})}
      onKeyUp={onKeyup || (() => {})}
      className={className}
    >
      {children}
    </div>
  );
};

export type GenreClipListProps = {
  className?: string;
  appearance?: 'large';
};

export const GenreClipList: FunctionalComponent<GenreClipListProps> = ({
  children,
  className,
  appearance,
}) => (
  <div
    className={`genre-clip-list ${appearance ? `genre-clip-list--${appearance}` : ''}${
      className || ''
    }`}
  >
    {children}
  </div>
);
