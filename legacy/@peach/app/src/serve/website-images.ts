import path from 'path';
import { createReadStream } from 'fs';
import { Request, Response } from 'express';
import { getGenreImagePath, getScreencapPath, getWebsiteImagePath } from '@peach/domain';

export const serveWebsiteImages = async (req: Request, res: Response) => {
  const requested = req.params.websiteId;

  if (!requested) {
    res.status(404);
    return res.send();
  }
  const websiteImagePath = await getWebsiteImagePath();

  if (!websiteImagePath) {
    res.status(400);
    return res.send('No website image path configured!');
  }
  const s = createReadStream(path.join(websiteImagePath, requested));

  s.on('open', () => {
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=604800, immutable');
    s.pipe(res);
  });

  s.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });

  return Promise.resolve();
};
