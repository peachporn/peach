import { Request, Response } from 'express';
import path from 'path';
import { createReadStream, promises } from 'fs';
import { getScreencapPath, MovieFormat, moviePathForId } from '@peach/domain';

const { stat } = promises;

const mime: Map<MovieFormat, string> = new Map();
mime.set('mp4', 'video/mp4');
mime.set('wmv', 'video/x-ms-wmv');
mime.set('avi', 'video/x-msvideo');

const getPositions = (range: string = '0-', fileSize: number) => {
  const positions = range.replace(/bytes=/, '').split('-');
  const start = parseInt(positions[0], 10);
  const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;

  return { start, end, chunkSize: end - start + 1 };
};

export const serveMovies = async (req: Request, res: Response) => {
  const requestedMovieId = parseInt(req.params.movieId, 10);
  if (!requestedMovieId) {
    res.status(404);
    return res.send();
  }

  const moviePath = await moviePathForId(requestedMovieId);
  if (!moviePath) {
    res.status(404);
    return res.send('Not found');
  }

  const { range } = req.headers;
  const stats = await stat(moviePath);

  const { start, end, chunkSize } = getPositions(range, stats.size);
  const contentType = mime.get((moviePath.split('.')[1] as MovieFormat) || 'mp4') || 'video/mp4';

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': contentType,
  });

  const s = createReadStream(moviePath, { start, end });

  s.on('open', () => {
    s.pipe(res);
  });

  s.on('error', () => {
    res.status(404).end('Not found');
  });

  return Promise.resolve();
};
