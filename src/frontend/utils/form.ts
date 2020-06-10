export const isTouched = (o: Record<string, true | undefined>) =>
  Object.keys(o).length > 0 && Object.values(o).some(x => x !== undefined);
