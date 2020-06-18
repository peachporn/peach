import { FunctionalComponent, h } from 'preact';

export type HeadlineProps = {
  onClick?: OnEvent;
};

export const Headline1: FunctionalComponent<HeadlineProps> = ({ onClick, children }) => (
  <h1 onClick={onClick} className="headline headline--1">
    {children}
  </h1>
);

export const Headline2: FunctionalComponent<HeadlineProps> = ({ onClick, children }) => (
  <h2 onClick={onClick} className="headline headline--2">
    {children}
  </h2>
);
