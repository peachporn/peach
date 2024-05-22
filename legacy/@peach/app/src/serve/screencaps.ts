import path from 'path';
import { createReadStream } from 'fs';
import { Request, Response } from 'express';
import { getScreencapPath } from '@peach/domain';

export const serveScreencaps = async (req: Request, res: Response) => {
  const requestedScreencap = path.join(req.params.movieId, req.params[0]);

  if (!requestedScreencap) {
    res.status(404);
    return res.send();
  }

  const screencapPath = await getScreencapPath();

  if (!screencapPath) {
    res.status(400);
    return res.send('No screencap path configured!');
  }

  const s = createReadStream(path.join(screencapPath, requestedScreencap));

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
