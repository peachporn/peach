export const liftMaybe =
  <T, R>(fn: (x: T) => R): ((x: T | undefined | null) => R | undefined) =>
  (x: T | undefined | null) =>
    x ? fn(x) : undefined;
