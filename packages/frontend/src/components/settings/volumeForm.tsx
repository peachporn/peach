import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Headline2, Input, Table, TableCell, TableRow } from '@peach/components';
import { Flex } from '@peach/components/src/components/flex';
import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'preact/hooks';
import { MutationSaveVolumesArgs, Volume } from '../../generated/types';
import { i } from '../../i18n/i18n';
import { saveVolumesMutation } from '../../mutations/saveVolumes.gql';
import { SettingsContext } from '../../context/settings';

type VolumeFormData = {
  volumes: Volume[];
};

export const VolumeForm: FunctionalComponent = () => {
  const { volumes } = useContext(SettingsContext);

  const [saveVolumes] = useMutation<MutationSaveVolumesArgs>(saveVolumesMutation);
  const { control, register, handleSubmit } = useForm<VolumeFormData>({
    defaultValues: {
      volumes,
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'volumes',
  });
  const onSubmit = (data: VolumeFormData) => saveVolumes({ variables: { input: data } });

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
        <Button type="submit">{i('FORM_SAVE')}</Button>
      </Flex>
    </form>
  );
};
