import { FunctionalComponent, h } from 'preact';

export const Loading: FunctionalComponent = () => (
  <div className="w-full flex justify-center">
    <img
      alt="loading"
      src="/static/logo.png"
      className="animate-squish mb-4 mt-14 rounded-full w-20 h-20"
    />
  </div>
);
