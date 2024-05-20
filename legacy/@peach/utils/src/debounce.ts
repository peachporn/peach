export const debounce = (fn: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  const now = () => new Date().getTime();
  let timeout: NodeJS.Timeout;

  let startTime = now() - wait;

  const resetStartTime = () => {
    startTime = now();
  };

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      const timeLeft = startTime + wait - now();
      if (timeout) {
        clearTimeout(timeout);
      }
      if (startTime + wait <= now()) {
        resetStartTime();
        resolve(func(...args));
      } else {
        timeout = setTimeout(() => {
          resetStartTime();
          resolve(func(...args));
        }, timeLeft);
      }
    });
};
