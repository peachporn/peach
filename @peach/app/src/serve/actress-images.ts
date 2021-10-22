import path from 'path';
import { createReadStream } from 'fs';
import { Request, Response } from 'express';
import { getActressImagePath, getScreencapPath } from '@peach/domain';

export const serveActressImages = async (req: Request, res: Response) => {
  const requested = req.params.actressId;

  if (!requested) {
    res.status(404);
    return res.send();
  }

  const actressImagePath = await getActressImagePath();

  if (!actressImagePath) {
    res.status(400);
    return res.send('No actress image path configured!');
  }

  const s = createReadStream(path.join(actressImagePath, requested));

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
