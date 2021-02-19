import {
  actressUploadImageRoute,
  genreUploadImageRoute,
  websiteUploadImageRoute,
} from '../utils/route';

const uploadImage = (formKey: string, uploadImageRouteFn: (id: number) => string) => (
  id: number,
  file: File,
) => {
  const formData = new FormData();

  formData.append(formKey, file);

  return fetch(uploadImageRouteFn(id), {
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

export const uploadActressImage = uploadImage('actressImage', actressUploadImageRoute);
export const uploadGenreImage = uploadImage('genreImage', genreUploadImageRoute);
export const uploadWebsiteImage = uploadImage('websiteImage', websiteUploadImageRoute);

const uploadImageFromUrl = (formKey: string, uploadImageRouteFn: (id: number) => string) => (
  id: number,
  url: string,
) =>
  fetch(uploadImageRouteFn(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [formKey]: url,
    }),
  }).then(res => {
    if (!res.ok) {
      return res.text().then(t => {
        throw new Error(t);
      });
    }
    return undefined;
  });

export const uploadActressImageFromUrl = uploadImageFromUrl(
  'actressImageUrl',
  actressUploadImageRoute,
);
export const uploadGenreImageFromUrl = uploadImageFromUrl('genreImageUrl', genreUploadImageRoute);
export const uploadWebsiteImageFromUrl = uploadImageFromUrl(
  'websiteImageUrl',
  websiteUploadImageRoute,
);
