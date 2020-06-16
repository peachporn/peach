import { FunctionalComponent, h } from 'preact';

export type BackdropProps = {
  src: string;
  alt: string;
};

export const Backdrop: FunctionalComponent<BackdropProps> = ({ src, alt }) => (
  <img alt={alt} className="backdrop" src={src} />
);
