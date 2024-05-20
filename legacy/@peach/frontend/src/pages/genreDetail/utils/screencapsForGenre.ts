import { GenreDetailQuery } from '@peach/types';
import { shuffle } from '@peach/utils/src/list';

export const screencapsForGenre = (genre: GenreDetailQuery['genre']) =>
  shuffle(
    [
      ...(genre?.fetishMovies || []).map(m => ({
        movieTitle: m.title,
        src: m.screencaps.find(s => s.cover)!.src,
      })),
      ...(genre?.movies || []).map(m => ({
        movieTitle: m.title,
        src: m.screencaps.find(s => s.cover)!.src,
      })),
      ...(genre?.fetishMovies || []).flatMap(m =>
        m.screencaps
          .filter(s => !s.cover)
          .map(s => ({
            movieTitle: m.title,
            src: s.src,
          })),
      ),
      ...(genre?.movies || []).flatMap(m =>
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
