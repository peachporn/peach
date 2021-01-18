import { h, FunctionalComponent } from 'preact';

import { useState } from 'preact/hooks';

import logo from '../static/logo.png';

export type ImageProps = {
  className?: string;
  src: string;
  alt: string;
  placeholder?: string;
};
export const Image: FunctionalComponent<ImageProps> = ({
  className,
  src,
  placeholder = logo,
  alt,
}) => {
  const [source, setSource] = useState(src);

  return (
    <img
      className={className}
      alt={alt}
      onError={() => {
        if (placeholder) {
          setSource(placeholder);
        }
      }}
      src={source}
    />
  );
};
