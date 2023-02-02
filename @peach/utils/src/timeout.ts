export const setTimeoutP = <T extends unknown>(fn: () => T, ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(fn()), ms);
  });

export const wait = (ms: number) => setTimeoutP(() => {}, ms);
