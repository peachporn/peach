import { FunctionalComponent, h } from 'preact';

export const Headline1: FunctionalComponent = ({ children }) => (
  <h1 className="headline headline--1">{children}</h1>
);

export const Headline2: FunctionalComponent = ({ children }) => (
  <h2 className="headline headline--2">{children}</h2>
);
