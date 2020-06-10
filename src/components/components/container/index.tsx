import { FunctionalComponent, h } from 'preact';

export type ContainerProps = {
  background?: 'transparent' | 'white';
  width?: 'wide' | 'narrow';
};

export const Container: FunctionalComponent<ContainerProps> = ({
  background = 'transparent',
  width = 'wide',
  children,
}) => (
  <section className={`container container--${background} container--${width}`}>{children}</section>
);
