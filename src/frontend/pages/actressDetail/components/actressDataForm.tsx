import { Fragment, FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  boobs,
  cupsizes,
  ethnicities,
  eyecolors,
  haircolors,
} from '../../../../domain/actress/fixtures';
import { DataGridContainer, DataGridEntry } from '../../../components/dataGrid';
import { i } from '../../../i18n/i18n';
import { FloatingControls } from '../../../../components/components/floatingControls';
import { updateActressMutation } from '../mutations/updateActress.gql';
import { Button, Input, Select } from '../../../../components';
import { formatValue } from '../../../../utils/date';

export type ActressDataFormProps = {
  actress: Pick<
    Actress,
    | 'id'
    | 'dateOfBirth'
    | 'dateOfCareerstart'
    | 'dateOfRetirement'
    | 'dateOfDeath'
    | 'name'
    | 'cupsize'
    | 'haircolor'
    | 'eyecolor'
    | 'ethnicity'
    | 'boobs'
    | 'piercings'
    | 'tattoos'
    | 'height'
    | 'weight'
    | 'measurements'
  >;
  cancel: () => void;
  submit: () => void;
};

type ActressFormData = {
  name: string;
  dateOfBirth: string;
  dateOfCareerstart: string;
  dateOfRetirement: string;
  dateOfDeath: string;
  haircolor: Haircolor;
  eyecolor: Eyecolor;
  ethnicity: Ethnicity;
  height: string;
  weight: string;
  measurements: Measurements;
  cupsize: Cupsize;
  boobs: Boobs;
  tattoos: string;
  piercings: string;
};

export const ActressDataForm: FunctionalComponent<ActressDataFormProps> = ({
  actress,
  cancel,
  submit,
}) => {
  const { reset, watch, register, handleSubmit } = useForm<ActressFormData>({
    mode: 'onChange',
    defaultValues: {
      ...actress,
      dateOfBirth: !actress.dateOfBirth ? undefined : formatValue(new Date(actress.dateOfBirth)),
      dateOfCareerstart: !actress.dateOfCareerstart
        ? undefined
        : formatValue(new Date(actress.dateOfCareerstart)),
      dateOfRetirement: !actress.dateOfRetirement
        ? undefined
        : formatValue(new Date(actress.dateOfRetirement)),
      dateOfDeath: !actress.dateOfDeath ? undefined : formatValue(new Date(actress.dateOfDeath)),
      height: actress.height?.toString(),
      weight: actress.weight?.toString(),
    },
  });

  const [save] = useMutation<UpdateActressMutation, UpdateActressMutationVariables>(
    updateActressMutation,
  );

  const onSubmit = (data: ActressFormData) => {
    save({
      variables: {
        actressId: actress.id,
        data: {
          ...data,
          haircolor: data.haircolor || undefined,
          eyecolor: data.eyecolor || undefined,
          ethnicity: data.ethnicity || undefined,
          boobs: data.boobs || undefined,
          cupsize: data.cupsize || undefined,
          height: data.height ? parseInt(data.height, 10) : undefined,
          weight: data.weight ? parseInt(data.weight, 10) : undefined,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : undefined,
          dateOfCareerstart: data.dateOfCareerstart
            ? new Date(data.dateOfCareerstart).toISOString()
            : undefined,
          dateOfRetirement: data.dateOfRetirement
            ? new Date(data.dateOfRetirement).toISOString()
            : undefined,
          dateOfDeath: data.dateOfDeath ? new Date(data.dateOfDeath).toISOString() : undefined,
          measurements:
            data.measurements.bust && data.measurements.waist && data.measurements.hips
              ? {
                  bust: parseInt(`${data.measurements.bust}`, 10),
                  waist: parseInt(`${data.measurements.waist}`, 10),
                  hips: parseInt(`${data.measurements.hips}`, 10),
                }
              : undefined,
        },
      },
    })
      .then(() => {
        toast.success(i('ACTRESS_FORM_SUCCESS'));
        reset({
          name: data.name,
        });
        submit();
      })
      .catch(console.error);
  };

  return (
    <div className="actress-form">
      <FloatingControls>
        <Button tabIndex={2} appearance="inverted" onClick={handleSubmit(onSubmit)}>
          {i('FORM_SAVE')}
        </Button>
        <Button appearance="inverted" onClick={cancel}>
          {i('FORM_CANCEL')}
        </Button>
      </FloatingControls>
      <Input
        tabIndex={1}
        onEnter={handleSubmit(onSubmit)}
        ref={register}
        name="name"
        appearance="display"
      />
      <DataGridContainer>
        <DataGridEntry
          label="ACTRESS_DATEOFBIRTH"
          value={<Input type="date" name="dateOfBirth" ref={register} appearance="wide" />}
        />
        <DataGridEntry
          label="ACTRESS_DATEOFCAREERSTART"
          value={<Input type="date" name="dateOfCareerstart" ref={register} appearance="wide" />}
        />
        <DataGridEntry
          label="ACTRESS_DATEOFRETIREMENT"
          value={<Input type="date" name="dateOfRetirement" ref={register} appearance="wide" />}
        />
        <DataGridEntry
          label="ACTRESS_DATEOFDEATH"
          value={<Input type="date" name="dateOfDeath" ref={register} appearance="wide" />}
        />
        <DataGridEntry
          label="ACTRESS_HAIRCOLOR"
          value={
            <Select name="haircolor" ref={register}>
              {haircolors.map(haircolor => (
                <option value={haircolor}>{haircolor}</option>
              ))}
            </Select>
          }
        />
        <DataGridEntry
          label="ACTRESS_EYECOLOR"
          value={
            <Select name="eyecolor" ref={register}>
              {eyecolors.map(eyecolor => (
                <option value={eyecolor}>{eyecolor}</option>
              ))}
            </Select>
          }
        />
        <DataGridEntry
          label="ACTRESS_ETHNICITY"
          value={
            <Select name="ethnicity" ref={register}>
              {ethnicities.map(ethnicity => (
                <option value={ethnicity}>{ethnicity}</option>
              ))}
            </Select>
          }
        />
        <DataGridEntry
          label="ACTRESS_HEIGHT"
          value={
            <Input
              name="height"
              appearance="wide"
              ref={register({
                validate: {
                  positiveInt: value => value === '' || parseInt(value, 10) > 0,
                },
              })}
            />
          }
        />
        <DataGridEntry
          label="ACTRESS_WEIGHT"
          value={
            <Input
              name="weight"
              appearance="wide"
              ref={register({
                validate: {
                  positiveInt: value => value === '' || parseInt(value, 10) > 0,
                },
              })}
            />
          }
        />
        <DataGridEntry
          label="ACTRESS_MEASUREMENTS"
          value={
            <Fragment>
              <Input
                name="measurements.bust"
                appearance="third"
                ref={register({
                  validate: {
                    positiveInt: value => value === '' || parseInt(value, 10) > 0,
                  },
                })}
              />
              <Input
                name="measurements.waist"
                appearance="third"
                ref={register({
                  validate: {
                    positiveInt: value => value === '' || parseInt(value, 10) > 0,
                  },
                })}
              />
              <Input
                name="measurements.hips"
                appearance="third"
                ref={register({
                  validate: {
                    positiveInt: value => value === '' || parseInt(value, 10) > 0,
                  },
                })}
              />
            </Fragment>
          }
        />
        <DataGridEntry
          label="ACTRESS_CUPSIZE"
          value={
            <Select name="cupsize" ref={register}>
              {cupsizes.map(cupsize => (
                <option value={cupsize}>{cupsize}</option>
              ))}
            </Select>
          }
        />
        <DataGridEntry
          label="ACTRESS_BOOBS"
          value={
            <Select name="boobs" ref={register}>
              {boobs.map(boob => (
                <option value={boob}>{boob}</option>
              ))}
            </Select>
          }
        />
        <DataGridEntry
          label="ACTRESS_TATTOOS"
          value={<Input name="tattoos" ref={register} appearance="wide" />}
        />
        <DataGridEntry
          label="ACTRESS_PIERCINGS"
          value={<Input name="piercings" ref={register} appearance="wide" />}
        />
      </DataGridContainer>
    </div>
  );
};
