import { h, FunctionalComponent } from 'preact';

import { useState } from 'preact/hooks';

export type ImageProps = {
  className?: string;
  src: string;
  alt: string;
  placeholder?: string;
};
export const Image: FunctionalComponent<ImageProps> = ({ className, src, placeholder, alt }) => {
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
