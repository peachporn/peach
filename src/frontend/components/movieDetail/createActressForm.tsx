import { FunctionalComponent, h } from 'preact';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { createActressMutation } from '../../mutations/createActress.gql';
import { Button } from '../../../components/components/button';
import { i } from '../../i18n/i18n';

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
      if (data) {
        onSubmit(data.createActress);
      }
    });

  return <Button onClick={createActressSubmit}>{i('ACTRESS_CREATE_BUTTON')}</Button>;
};
