import { Request, Response } from 'express';
import path from 'path';
import { createReadStream } from 'fs';
import { getActressImagePath, getScreencapPath } from '../../domain/settings';

export const serveActressImages = async (req: Request, res: Response) => {
  const requested = req.params.actressId;

  if (!requested) {
    res.status(404);
    return res.send();
  }

  const actressImagePath = await getActressImagePath();

  if (!actressImagePath) {
    res.status(400);
    return res.send('No screencap path configured!');
  }

  const s = createReadStream(path.join(actressImagePath, requested));

  s.on('open', () => {
    res.set('Content-Type', 'image/jpeg');
    s.pipe(res);
  });

  s.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });

  return Promise.resolve();
};
