import { FunctionalComponent, h } from 'preact';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Button } from '../../../../components';
import { createActressMutation } from '../mutations/createActress.gql';
import { i } from '../../../i18n/i18n';

export type CreateActressFormProps = {
  name: string;
  onSubmit: (actress: Pick<Actress, 'id' | 'name'>) => void;
};

export const CreateActressForm: FunctionalComponent<CreateActressFormProps> = ({
  name,
  onSubmit,
}) => {
  const [createActress] = useMutation<CreateActressMutation, CreateActressMutationVariables>(
    createActressMutation,
  );

  const createActressSubmit = () =>
    createActress({
      variables: {
        name,
      },
    }).then(({ data }) => {
      toast.success(i('ACTRESS_CREATE_SUCCESS'));
      if (data?.createActress) {
        onSubmit(data.createActress);
      }
    });

  return <Button onClick={createActressSubmit}>{i('ACTRESS_CREATE_BUTTON')}</Button>;
};
