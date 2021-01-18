import { Prisma } from '@prisma/client';

export type ScreencapMovie = Prisma.MovieGetPayload<{
  select: { path: true };
  include: { volume: true; metadata: true };
}>;
