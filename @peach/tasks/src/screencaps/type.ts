import { Prisma } from '@prisma/client';

export type ScreencapMovie = Prisma.MovieGetPayload<{
  include: { volume: true; metadata: true };
}>;
