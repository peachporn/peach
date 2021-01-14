import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useContext } from 'preact/hooks';
import { toast } from 'react-toastify';
import { SettingsContext } from '../../../context/settings';
import { Button, Flex, Headline2, Input, Table, TableCell, TableRow } from '../../../../components';
import { i } from '../../../i18n/i18n';
import { isTouched } from '../../../utils/form';
import { saveVolumesMutation } from '../mutations/saveVolumes.gql';

type VolumeFormData = {
  volumes: Volume[];
};

export const VolumeForm: FunctionalComponent = () => {
  const { volumes } = useContext(SettingsContext);

  const [saveVolumes] = useMutation<SaveVolumesMutation, SaveVolumesMutationVariables>(
    saveVolumesMutation,
  );
  const {
    formState: { touched },
    control,
    register,
    handleSubmit,
  } = useForm<VolumeFormData>({
    defaultValues: {
      volumes,
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'volumes',
  });
  const onSubmit = (data: VolumeFormData) =>
    saveVolumes({ variables: { input: data } }).then(() => {
      toast.success(i('SETTINGS_FORM_SUCCESS'));
    });

  return (
    <form
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
    >
      <Headline2>{i('SETTINGS_VOLUMES')}</Headline2>
      <Table>
        {fields.map((volume, index) => (
          <TableRow key={volume.id}>
            <TableCell>
              <Input
                placeholder="Name"
                appearance="wide"
                name={`volumes[${index}].name`}
                ref={register}
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Path"
                appearance="wide"
                name={`volumes[${index}].path`}
                ref={register}
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Flex justify="end">
        <Button
          appearance="inverted"
          onClick={() => {
            append({ name: '', path: '' });
          }}
        >
          +
        </Button>
        {isTouched(touched) && <Button type="submit">{i('FORM_SAVE')}</Button>}
      </Flex>
    </form>
  );
};
