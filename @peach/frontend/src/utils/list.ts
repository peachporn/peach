import range from 'ramda/es/range';

export const shuffle = <T>(list: T[]) => {
  let idx = 0;
  let position;
  const result: typeof list = [];

  while (idx < list.length) {
    position = Math.floor((idx + 1) * Math.random());
    result[idx] = result[position];
    result[position] = list[idx];
    idx += 1;
  }

  return result;
};

export const forceLength = <T>(length: number, list: T[]): T[] => {
  if (!list.length) {
    return [];
  }

  if (list.length >= length) {
    return list.slice(0, length);
  }

  const diff = length - list.length;
  const randomElement = () => list[Math.floor(Math.random() * list.length)];

  return [...list, ...range(0, diff).map(() => randomElement())];
};

export const nonNullish = <T>(xs: (T | undefined | null)[]): T[] =>
  xs.filter(x => x !== undefined && x !== null) as T[];
