export const omitIfAllUndefined = (o: object) =>
  Object.values(o).some(v => v !== undefined) ? o : undefined;
