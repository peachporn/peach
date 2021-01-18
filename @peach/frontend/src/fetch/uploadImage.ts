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

export const uploadActressImageFromUrl = (actressId: Actress['id'], url: string) =>
  fetch(actressUploadImageRoute(actressId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      actressImageUrl: url,
    }),
  }).then(res => {
    if (!res.ok) {
      return res.text().then(t => {
        throw new Error(t);
      });
    }
    return undefined;
  });

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

export const uploadGenreImageFromUrl = (genreId: Genre['id'], url: string) =>
  fetch(genreUploadImageRoute(genreId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      genreImageUrl: url,
    }),
  }).then(res => {
    if (!res.ok) {
      return res.text().then(t => {
        throw new Error(t);
      });
    }
    return undefined;
  });
