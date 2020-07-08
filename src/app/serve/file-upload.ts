import { Application } from 'express';
import fileUpload from 'express-fileupload';
import { getActressImagePath, getGenreImagePath } from '../../domain/settings';
import { prisma } from '../../prisma';

export const applyFileUploadMiddleware = (app: Application) => {
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  );

  app.post('/upload/actress/:actressId', async (req, res) => {
    const { actressId } = req.params;
    const file = req.files && req.files.actressImage;

    if (!actressId) {
      res.status(400);
      return res.send('No actress id given!');
    }

    const actress = await prisma.actress.findOne({ where: { id: parseInt(actressId, 10) } });

    if (!actress) {
      res.status(400);
      return res.send(`No actress with id ${actressId} found!`);
    }

    if (!file) {
      res.status(400);
      return res.send("No file named 'actressImage' uploaded!");
    }

    if (Array.isArray(file)) {
      res.status(400);
      return res.send("Multiple files named 'actressImage' uploaded! Please upload only one file");
    }

    if (file.truncated) {
      res.status(400);
      return res.send('File size exceeded! Please upload a file smaller than 50 MB');
    }

    if (file.mimetype !== 'image/jpeg') {
      res.status(400);
      return res.send('Only JPGs are supported!');
    }

    const actressImagePath = await getActressImagePath();

    if (!actressImagePath) {
      res.status(400);
      return res.send('No actress image path configured!');
    }

    await file.mv(`${actressImagePath}/${actressId}.jpg`).catch(e => {
      res.status(500);
      res.send(e);
    });

    res.status(200);
    return res.send('Success!');
  });

  app.post('/upload/genre/:genreId', async (req, res) => {
    const { genreId } = req.params;
    const file = req.files && req.files.genreImage;

    if (!genreId) {
      res.status(400);
      return res.send('No genre id given!');
    }

    const genre = await prisma.genre.findOne({ where: { id: parseInt(genreId, 10) } });

    if (!genre) {
      res.status(400);
      return res.send(`No genre with id ${genreId} found!`);
    }

    if (!file) {
      res.status(400);
      return res.send("No file named 'genreImage' uploaded!");
    }

    if (Array.isArray(file)) {
      res.status(400);
      return res.send("Multiple files named 'genreImage' uploaded! Please upload only one file");
    }

    if (file.truncated) {
      res.status(400);
      return res.send('File size exceeded! Please upload a file smaller than 50 MB');
    }

    if (file.mimetype !== 'image/jpeg') {
      res.status(400);
      return res.send('Only JPGs are supported!');
    }

    const genreImagePath = await getGenreImagePath();

    if (!genreImagePath) {
      res.status(400);
      return res.send('No genre image path configured!');
    }

    await file.mv(`${genreImagePath}/${genreId}.jpg`).catch(e => {
      res.status(500);
      res.send(e);
    });

    res.status(200);
    return res.send('Success!');
  });

  return app;
};
