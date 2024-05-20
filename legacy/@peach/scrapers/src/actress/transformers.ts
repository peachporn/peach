export const regex =
  <T extends unknown>(regexp: RegExp, next: (s: string) => T) =>
  (s: string) => {
    const match = s.match(regexp);
    if (match && match.length >= 1) {
      return next(match[1]);
    }
    return undefined;
  };

export const filter =
  <T extends string>(fn: (s: string) => boolean) =>
  (s: string) =>
    fn(s) ? (s as T) : undefined;
