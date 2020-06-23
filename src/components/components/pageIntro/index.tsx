import { FunctionalComponent, h, VNode } from 'preact';

export type PageIntroProps = {
  heroSlot?: VNode;
};

export const PageIntro: FunctionalComponent<PageIntroProps> = ({ heroSlot, children }) => (
  <section className="page-intro">
    {!heroSlot ? null : <div className="page-intro__hero">{heroSlot}</div>}
    {children}
  </section>
);
