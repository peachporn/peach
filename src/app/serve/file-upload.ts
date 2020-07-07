import { Application } from 'express';
import fileUpload from 'express-fileupload';
import { getActressImagePath } from '../../domain/settings';
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

  return app;
};
