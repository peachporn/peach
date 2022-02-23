import { useMutation } from '@apollo/client';
import {
  ActressDetailFragment,
  UpdateActressMutation,
  UpdateActressMutationVariables,
} from '@peach/types';
import { actressFormValuesToUpdateInput } from '../../../domain/actress/conversions/formValuesToUpdateInput';
import { ActressFormValues } from '../../../domain/actress/types/actressFormValues';
import { uploadActressImageFromUrl } from '../../../fetch/uploadImage';
import { updateActressMutation } from '../mutations/updateActress.gql';

export const useUpdateActress = (actress: ActressDetailFragment, onSubmitCallback: () => void) => {
  const [updateActress] = useMutation<UpdateActressMutation, UpdateActressMutationVariables>(
    updateActressMutation,
  );

  return (data: ActressFormValues) =>
    updateActress({
      variables: {
        actressId: actress.id,
        data: actressFormValuesToUpdateInput(data),
      },
    })
      .then(() =>
        data.imageUrl && data.imageUrl !== actress.picture
          ? uploadActressImageFromUrl(actress.id, data.imageUrl)
          : Promise.resolve(),
      )
      .then(() => {
        onSubmitCallback();
      });
};
