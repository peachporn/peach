import { JSX, Fragment, FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type GenreClipProps = {
  genre: GenreClipGenre;
  className?: string;
  onDblClick?: JSX.MouseEventHandler<HTMLElement>;
  onClick?: JSX.MouseEventHandler<HTMLElement>;
  onKeyup?: JSX.KeyboardEventHandler<HTMLElement>;
  interactionSlot?: VNode;
  descriptionSlot?: VNode;
  focus?: boolean;
  shadow?: boolean;
  style?: Record<string, string>;
  appearance?: 'tiny';
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
  focus,
  style,
  shadow,
  children: propChildren,
}) => {
  if (name === 'Fisting') {
    console.log(propChildren, descriptionSlot);
  }
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
        <div className="genre-clip__description-slot">{descriptionSlot}</div>
      ) : null}
      {interactionSlot ? (
        <div className="genre-clip__interaction-slot">{interactionSlot}</div>
      ) : null}
      <div className="genre-clip__children">{propChildren}</div>
    </Fragment>
  );

  return (
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

export const GenreClipList: FunctionalComponent<{ className?: string }> = ({
  children,
  className,
}) => <div className={`genre-clip-list ${className || ''}`}>{children}</div>;
