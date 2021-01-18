import { FunctionalComponent, h } from 'preact';

export const Slider: FunctionalComponent = ({ children }) => (
  <div className="overflow-x-auto flex gap-3 py-2 scroll-snap scroll-px-8 px-8">
    {children}
    <div className="flex-none ml-8 w-8" />
  </div>
);

export const SliderItem: FunctionalComponent = ({ children }) => (
  <div className="flex-none snap-align-start">{children}</div>
);
