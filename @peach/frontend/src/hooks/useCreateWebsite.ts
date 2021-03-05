import { useMutation } from '@apollo/client';
import { CreateWebsiteMutation, CreateWebsiteMutationVariables } from '@peach/types';
import { omit } from 'ramda';
import { createWebsiteMutation } from '../pages/websiteList/mutations/createWebsite.gql';
import { uploadWebsiteImage, uploadWebsiteImageFromUrl } from '../fetch/uploadImage';
import { WebsiteFormValues } from '../components/websiteForm';

export const useCreateWebsite = () => {
  const [createWebsite] = useMutation<CreateWebsiteMutation, CreateWebsiteMutationVariables>(
    createWebsiteMutation,
  );
  return (data: WebsiteFormValues) =>
    createWebsite({
      variables: {
        data: {
          ...omit(['image', 'imageUrl'], data),
          fetish: data.fetish ? parseInt(data.fetish, 10) : undefined,
        },
      },
    }).then(({ data: createWebsiteData }) => {
      const websiteId = createWebsiteData?.createWebsite?.id;
      if (!websiteId) return Promise.reject();
      return (data.image?.length
        ? uploadWebsiteImage(websiteId, data.image[0])
        : data.imageUrl
        ? uploadWebsiteImageFromUrl(websiteId, data.imageUrl)
        : Promise.resolve()
      ).then(() => createWebsiteData);
    });
};
