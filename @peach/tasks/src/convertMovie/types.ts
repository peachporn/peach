import { logScope } from '@peach/utils/src/logging';
import { Prisma } from '@prisma/client';

export const log = logScope('convert-movie');

export type ConvertableMovie = Prisma.MovieGetPayload<{
  select: {
    path: true;
  };
  include: {
    volume: true;
  };
}>;