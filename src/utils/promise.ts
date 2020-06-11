export const sequence = <T extends unknown>(promiseFns: (() => Promise<T>)[]): Promise<T[]> =>
  promiseFns.reduce(
    (p, fn) => p.then(acc => fn().then(v => [...acc, v])),
    Promise.resolve([] as T[]),
  );
