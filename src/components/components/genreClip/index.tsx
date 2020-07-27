import { Fragment, FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type GenreClipProps = {
  genre: GenreClipGenre;
  className?: string;
  onClick?: OnEvent;
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
  onClick,
  interactionSlot,
  descriptionSlot,
  focus,
  style,
  shadow,
  children: propChildren,
}) => {
  const className = `genre-clip ${classNameProp || ''} ${focus ? 'genre-clip--focus' : ''}
  ${appearance ? `genre-clip--${appearance}` : ''}
  ${shadow ? 'genre-clip--shadow' : ''}
  ${descriptionSlot || interactionSlot ? 'genre-clip--with-slot' : ''}
  `.trim();

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
