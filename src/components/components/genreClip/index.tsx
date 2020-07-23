import { Fragment, FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type GenreClipProps = {
  genre: GenreClipGenre;
  className?: string;
  onClick?: OnEvent;
  interactionSlot?: VNode;
  focus?: boolean;
  shadow?: boolean;
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
  focus,
  shadow,
}) => {
  const className = `genre-clip ${classNameProp || ''} ${focus ? 'genre-clip--focus' : ''}
  ${appearance ? `genre-clip--${appearance}` : ''}
  ${shadow ? 'genre-clip--shadow' : ''}`.trim();

  const children = (
    <Fragment>
      <Image className="genre-clip__image" src={picture || logo} alt={name} placeholder={logo} />
      {interactionSlot ? (
        <div className="genre-clip__interaction-slot">{interactionSlot}</div>
      ) : null}
    </Fragment>
  );

  return (
    <div tabIndex={0} role="button" onClick={onClick || (() => {})} className={className}>
      {children}
    </div>
  );
};

export const GenreClipList: FunctionalComponent<{ className?: string }> = ({
  children,
  className,
}) => <div className={`genre-clip-list ${className || ''}`}>{children}</div>;
