import { logScope } from '@peach/utils';
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
