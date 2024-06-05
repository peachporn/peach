import { useCallback, useRef } from "react";

export const useTimer = (handler: () => void, timeout: number = 150) => {
  const timerRef = useRef<number>(0);

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const startTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(handlerRef.current, timeout);
  }, [timeout]);

  const clearTimer = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  return { startTimer, clearTimer };
};
