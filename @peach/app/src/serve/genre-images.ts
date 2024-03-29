import path from 'path';
import { createReadStream } from 'fs';
import { Request, Response } from 'express';
import { getGenreImagePath, getScreencapPath } from '@peach/domain';

export const serveGenreImages = async (req: Request, res: Response) => {
  const requested = req.params.genreId;

  if (!requested) {
    res.status(404);
    return res.send();
  }

  const genreImagePath = await getGenreImagePath();

  if (!genreImagePath) {
    res.status(400);
    return res.send('No genre image path configured!');
  }

  const s = createReadStream(path.join(genreImagePath, requested));

  s.on('open', () => {
    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=604800, immutable');
    s.pipe(res);
  });

  s.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });

  return Promise.resolve();
};
