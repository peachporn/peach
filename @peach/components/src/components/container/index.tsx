import { FunctionalComponent, h } from 'preact';

export type ContainerProps = {
  background?: 'transparent' | 'white';
  width?: 'wide' | 'narrow' | 'medium';
  tall?: boolean;
};

export const Container: FunctionalComponent<ContainerProps> = ({
  background = 'transparent',
  width = 'wide',
  tall,
  children,
}) => (
  <section
    className={`container container--${background} container--${width} ${
      tall ? 'container--tall' : ''
    }`.trim()}
  >
    {children}
  </section>
);
