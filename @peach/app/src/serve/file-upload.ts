import { Application } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { getActressImagePath, getGenreImagePath, getWebsiteImagePath } from '@peach/domain';
import { downloadImage, prisma } from '@peach/utils';

const saveImageFromFile = async (
  file: UploadedFile | UploadedFile[],
  path: string,
  mimeTypes: string[] = ['image/jpeg'],
) => {
  if (Array.isArray(file)) {
    throw new Error('Multiple files uploaded! Please upload only one file');
  }

  if (file.truncated) {
    throw new Error('File size exceeded! Please upload a file smaller than 50 MB');
  }

  if (!mimeTypes.includes(file.mimetype)) {
    throw new Error('Only JPGs are supported!');
  }

  return file.mv(path);
};

export const applyFileUploadMiddleware = (app: Application) => {
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  );

  app.post('/upload/actress/:actressId', async (req, res) => {
    const { actressId } = req.params;
    const file = req.files && req.files.actressImage;
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

    const save = file
      ? saveImageFromFile(file, path)
      : url
      ? downloadImage(url, path)
      : Promise.reject();

    return save
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
    const file = req.files && req.files.genreImage;
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

    const save = file
      ? saveImageFromFile(file, path)
      : url
      ? downloadImage(url, path)
      : Promise.reject();

    return save
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
    const file = req.files && req.files.websiteImage;
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

    const save = file
      ? saveImageFromFile(file, path, ['image/png'])
      : url
      ? downloadImage(url, path)
      : Promise.reject();

    return save
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
