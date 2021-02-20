import { JSX, Fragment, FunctionalComponent, h, VNode } from 'preact';
import { GenreClipFragment } from '@peach/types';
import logo from '../../static/logo.png';
import { Image } from '../image';

export type GenreClipProps = {
  genre: GenreClipFragment;
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
  size?: string;
  url?: string;
};

export const GenreClip: FunctionalComponent<GenreClipProps> = ({
  genre: { name, picture },
  className: classNameProp,
  onDblClick,
  onClick,
  onKeyup,
  interactionSlot,
  descriptionSlot,
  descriptionSlotPermanent,
  focus,
  style,
  url,
  size,
  children: propChildren,
}) => {
  const className = `genre-clip
    relative inline-flex rounded-lg bg-white cursor-pointer overflow-hidden transition-all focus:outline-none text-sm h-${size}
    ${classNameProp || ''} ${focus ? 'genre-clip-focus' : ''}
    ${!propChildren ? 'genre-clip--no-child' : ''}
  `
    .trim()
    .replace('\n', '');

  const children = (
    <Fragment>
      <Image
        className={`h-${size} w-${size} object-cover rounded`}
        src={picture || logo}
        alt={name}
        placeholder={logo}
      />
      {descriptionSlot ? (
        <div
          className={`absolute top-0 w-${size} h-full bg-tintBlack text-white flex items-end p-1 font-bold transition-all z-10  ${
            descriptionSlotPermanent ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {descriptionSlot}
        </div>
      ) : null}
      {interactionSlot ? (
        <div className="absolute top-.5 left-.5 opacity-0 invisible text-white z-20">
          {interactionSlot}
        </div>
      ) : null}
      <div className={`flex ${propChildren ? 'p-2' : ''}`}>{propChildren}</div>
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
