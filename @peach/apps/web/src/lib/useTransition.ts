import { useEffect, useRef, useState } from "react";

export const useTransitionEvents = <T extends HTMLDivElement>(
  propertyName: string,
  { onStart, onEnd }: { onStart?: (node: T) => void; onEnd?: (node: T) => void }
) => {
  const ref = useRef<T>(null);

  const onStartRef = useRef(onStart);
  onStartRef.current = onStart;

  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const onTransitionStart = (e: TransitionEvent) => {
      if (e.propertyName !== propertyName) return;
      onStartRef.current?.(node);
    };

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== propertyName) return;
      onEndRef.current?.(node);
    };

    node.addEventListener("transitionstart", onTransitionStart);
    node.addEventListener("transitionend", onTransitionEnd);
    return () => {
      node.removeEventListener("transitionstart", onTransitionStart);
      node.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [propertyName]);

  return ref;
};

type TransitionState = "active" | "idle";
export const useTransitionState = <T extends HTMLDivElement>(propertyName: string) => {
  const [state, setState] = useState<TransitionState>("idle");

  const ref = useTransitionEvents<T>(propertyName, {
    onStart: () => setState("active"),
    onEnd: () => setState("idle"),
  });

  return [ref, state] as const;
};
