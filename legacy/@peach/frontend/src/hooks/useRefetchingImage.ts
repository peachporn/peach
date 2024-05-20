import { useState } from 'preact/hooks';

export const useRefetchingImage = (imageUrl: string | undefined) => {
  const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 10000));

  const refetch = () => {
    setRandomValue(Math.floor(Math.random() * 10000));
  };

  return [!imageUrl ? undefined : `${imageUrl}?v=${randomValue}`, refetch] as const;
};
