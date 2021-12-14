import { createContext as createPreactContext } from 'preact';
import { useContext as usePreactContext } from 'preact/hooks';

export const createContext = <T>() => {
  const Context = createPreactContext<T | undefined>(undefined);

  const useContext = () => {
    const consumer = usePreactContext(Context);
    if (consumer === undefined) {
      throw new Error('A context must always be used within a corresponding Provider!');
    }
    return consumer;
  };

  return [useContext, Context] as const;
};
