export const screencapFilename = (movieId: number, index: string) =>
  `${movieId}-${index.length === 1 ? `0${index}` : index}.jpg`;

export const indexFromFilename = (filename: string): number | null => {
  const match = new RegExp('-(?<index>\\d\\d).jpg$').exec(filename);
  if (!match || !match.groups) return null;
  return parseInt(match.groups.index, 10);
};
