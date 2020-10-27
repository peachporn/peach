import { FunctionalComponent, h } from 'preact';
import { Headline1 } from '../headline';

export type HeadParProps = {
  headline: string;
};

export const HeadBar: FunctionalComponent<HeadParProps> = ({ headline }) => (
  <section className="head-bar">
    <Headline1 className="head-bar__headline">{headline}</Headline1>
  </section>
);
