import { useEffect, useState } from 'preact/hooks';

export const useLocalStorageState = <T extends unknown>(key: string, initialValue: T) => {
  const fromLocalStorage = localStorage.getItem(key);
  const [x, setX] = useState<T>(JSON.parse(fromLocalStorage || JSON.stringify(initialValue)));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(x));
  }, [x]);

  return [x, setX] as const;
};
