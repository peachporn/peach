import { useMutation } from '@apollo/client';
import { CreateActressMutation, CreateActressMutationVariables } from '@peach/types';
import { actressFormValuesToCreateInput } from '../domain/actress/conversions/formValuesToCreateInput';
import { ActressFormValues } from '../domain/actress/types/actressFormValues';
import { uploadActressImageFromUrl } from '../fetch/uploadImage';
import { createActressMutation } from '../pages/actressList/mutations/createActress.gql';

export const useCreateActress = () => {
  const [createActress] = useMutation<CreateActressMutation, CreateActressMutationVariables>(
    createActressMutation,
  );

  return (formData: ActressFormValues) =>
    createActress({
      variables: {
        input: actressFormValuesToCreateInput(formData),
      },
    }).then(({ data: createActressData }) => {
      const actressId = createActressData?.createActress?.id;
      if (!actressId) return Promise.reject();
      return (
        formData.imageUrl
          ? uploadActressImageFromUrl(actressId, formData.imageUrl)
          : Promise.resolve()
      ).then(() => createActressData);
    });
};
