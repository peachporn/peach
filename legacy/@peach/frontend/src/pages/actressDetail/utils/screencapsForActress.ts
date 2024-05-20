import { ActressDetailFragment } from '@peach/types';
import { shuffle } from '@peach/utils/src/list';

export const screencapsForActress = (actress?: ActressDetailFragment) =>
  shuffle(
    [
      ...(actress?.movies || []).map(m => ({
        movieTitle: m.title,
        src: m.screencaps.find(s => s.cover)!.src,
      })),
      ...(actress?.movies || []).flatMap(m =>
        m.screencaps
          .filter(s => !s.cover)
          .map(s => ({
            movieTitle: m.title,
            src: s.src,
          })),
      ),
    ]
      .filter(Boolean)
      .slice(0, 6),
  );
