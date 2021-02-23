import { useEffect } from 'preact/hooks';

export const useScrollToTop = (deps: unknown[], condition?: () => boolean) => {
  useEffect(() => {
    if (!condition || (condition && condition())) {
      window.scrollTo(0, 0);
    }
  }, deps);
};
