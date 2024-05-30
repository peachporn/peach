import type { Actress, Genre } from "@peach/db";

export const actressUrl = (actress: Actress) => `/actresses/${actress.id}`;
export const genreUrl = (genre: Genre) => `/genres/${genre.id}`;
