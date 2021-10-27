import { useEffect } from 'preact/hooks';

export const useScrollToTop = (deps: unknown[], condition?: () => boolean) => {
  useEffect(() => {
    if (!condition || (condition && condition())) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, deps);
};
