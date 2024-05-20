import { getActressImagePath, getGenreImagePath, getWebsiteImagePath } from '@peach/domain';
import { downloadImage } from '@peach/utils/src/download-image';
import { prisma } from '@peach/utils/src/prisma';
import { Application } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import sharp from 'sharp';

export const applyFileUploadMiddleware = (app: Application) => {
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  );

  app.post('/upload/actress/:actressId', async (req, res) => {
    const { actressId } = req.params;
    const url = req.body && req.body.actressImageUrl;

    if (!actressId) {
      res.status(400);
      return res.send('No actress id given!');
    }

    const actress = await prisma.actress.findUnique({ where: { id: parseInt(actressId, 10) } });

    if (!actress) {
      res.status(400);
      return res.send(`No actress with id ${actressId} found!`);
    }

    const actressImagePath = await getActressImagePath();

    if (!actressImagePath) {
      res.status(400);
      return res.send('No actress image path configured!');
    }

    const path = `${actressImagePath}/${actressId}.jpg`;

    const file = url
      ? await downloadImage(url)
      : req.files?.actressImage
      ? Array.isArray(req.files.actressImage)
        ? (req.files.actressImage as UploadedFile[])[0].data
        : (req.files.actressImage as UploadedFile).data
      : null;

    if (!file) {
      res.status(500);
      return res.send('Could not find file!');
    }

    return sharp(Buffer.from(file))
      .jpeg()
      .toFile(path)
      .then(() => {
        res.status(200);
        res.send('Success!');
      })
      .catch((e: Error) => {
        res.status(500);
        res.send(e);
      });
  });

  app.post('/upload/genre/:genreId', async (req, res) => {
    const { genreId } = req.params;
    const url = req.body && req.body.genreImageUrl;

    if (!genreId) {
      res.status(400);
      return res.send('No genre id given!');
    }

    const genre = await prisma.genre.findUnique({ where: { id: parseInt(genreId, 10) } });

    if (!genre) {
      res.status(400);
      return res.send(`No genre with id ${genreId} found!`);
    }

    const genreImagePath = await getGenreImagePath();

    if (!genreImagePath) {
      res.status(400);
      return res.send('No genre image path configured!');
    }

    const path = `${genreImagePath}/${genreId}.jpg`;

    const file = url
      ? await downloadImage(url)
      : req.files?.genreImage
      ? Array.isArray(req.files.genreImage)
        ? (req.files.genreImage as UploadedFile[])[0].data
        : (req.files.genreImage as UploadedFile).data
      : null;

    if (!file) {
      res.status(500);
      return res.send('Could not find file!');
    }

    return sharp(Buffer.from(file))
      .jpeg()
      .toFile(path)
      .then(() => {
        res.status(200);
        res.send('Success!');
      })
      .catch((e: Error) => {
        res.status(500);
        res.send(e);
      });
  });

  app.post('/upload/website/:websiteId', async (req, res) => {
    const { websiteId } = req.params;
    const url = req.body && req.body.websiteImageUrl;

    if (!websiteId) {
      res.status(400);
      return res.send('No website id given!');
    }

    const website = await prisma.website.findUnique({ where: { id: parseInt(websiteId, 10) } });

    if (!website) {
      res.status(400);
      return res.send(`No website with id ${websiteId} found!`);
    }

    const websiteImagePath = await getWebsiteImagePath();

    if (!websiteImagePath) {
      res.status(400);
      return res.send('No website image path configured!');
    }

    const path = `${websiteImagePath}${websiteId}.png`;

    const file = url
      ? await downloadImage(url)
      : req.files?.websiteImage
      ? Array.isArray(req.files.websiteImage)
        ? (req.files.websiteImage as UploadedFile[])[0].data
        : (req.files.websiteImage as UploadedFile).data
      : null;

    if (!file) {
      res.status(500);
      return res.send('Could not find file!');
    }

    return sharp(Buffer.from(file))
      .png()
      .toFile(path)
      .then(() => {
        res.status(200);
        res.send('Success!');
      })
      .catch((e: Error) => {
        res.status(500);
        res.send(e);
      });
  });

  return app;
};
