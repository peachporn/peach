import type { Movie } from "@peach/db";

export const screencapFilename = (movieId: number, index: string) =>
  `${movieId}-${index.length === 1 ? `0${index}` : index}.jpg`;

export const screencapForMovie = ({ id, cover }: Movie) =>
  `/assets/screencaps/${id}/${screencapFilename(id, `${cover}`)}`;
