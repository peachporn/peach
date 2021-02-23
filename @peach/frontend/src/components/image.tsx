import { h, FunctionalComponent } from 'preact';

import { useState } from 'preact/hooks';

import logo from '../static/logo.png';

export type ImageProps = {
  onClick?: () => void;
  className?: string;
  src?: string;
  alt: string;
  placeholder?: string;
  onError?: () => void;
};

export const Image: FunctionalComponent<ImageProps> = ({
  className,
  src,
  placeholder = logo,
  alt,
  onClick,
  onError,
}) => {
  const [source, setSource] = useState(src);

  return (
    <img
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={className}
      alt={alt}
      onError={() => {
        if (placeholder) {
          setSource(placeholder);
        }
        if (onError) {
          onError();
        }
      }}
      src={source}
    />
  );
};
