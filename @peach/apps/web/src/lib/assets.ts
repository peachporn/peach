export const screencapFilename = (movieId: number, index: string) =>
  `${movieId}-${index.length === 1 ? `0${index}` : index}.jpg`;

export const screencapForMovie = ({ id, cover }: { id: number; cover: number }) =>
  `/assets/screencaps/${id}/${screencapFilename(id, `${cover}`)}`;

export const videoForMovie = ({ id }: { id?: number }) => `/assets/videos/${id}`;
