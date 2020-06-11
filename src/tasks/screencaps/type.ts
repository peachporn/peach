import { MovieGetPayload } from '@prisma/client';

export type ScreencapMovie = MovieGetPayload<{
  select: { path: true };
  include: { volume: true; metadata: true };
}>;
