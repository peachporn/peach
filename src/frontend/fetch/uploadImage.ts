import { actressUploadImageRoute, genreUploadImageRoute } from '../utils/route';

export const uploadActressImage = (actressId: Actress['id'], file: File) => {
  const formData = new FormData();

  formData.append('actressImage', file);

  return fetch(actressUploadImageRoute(actressId), {
    method: 'POST',
    body: formData,
  }).then(res => {
    if (!res.ok) {
      return res.text().then(t => {
        throw new Error(t);
      });
    }
    return undefined;
  });
};

export const uploadGenreImage = (genreId: Genre['id'], file: File) => {
  const formData = new FormData();

  formData.append('genreImage', file);

  return fetch(genreUploadImageRoute(genreId), {
    method: 'POST',
    body: formData,
  }).then(res => {
    if (!res.ok) {
      return res.text().then(t => {
        throw new Error(t);
      });
    }
    return undefined;
  });
};
