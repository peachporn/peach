import { FunctionalComponent, h } from 'preact';

type SliderProps = {
  padding?: number;
};

export const Slider: FunctionalComponent<SliderProps> = ({ children, padding = 8 }) => (
  <div className={`overflow-x-auto flex gap-3 py-2 scroll-snap scroll-px-${padding} px-${padding}`}>
    {children}
    {padding >= 0 ? <div className={`flex-none ml-${padding} w-${padding}`} /> : null}
  </div>
);

export const SliderItem: FunctionalComponent = ({ children }) => (
  <div className="flex-none snap-align-start">{children}</div>
);
