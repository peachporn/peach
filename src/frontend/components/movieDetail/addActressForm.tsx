import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { BubbleButton } from '../../../components/components/bubbleButton';
import { Modal } from '../../../components/components/modal';
import { Input } from '../../../components/components/input';
import { QuickInput } from '../../../components/components/quickInput';
import { Button } from '../../../components/components/button';
import { i } from '../../i18n/i18n';
import { Icon } from '../../../components/components/icon';
import { Headline2 } from '../../../components/components/headline';

export type AddActressFormProps = {
  movie: Pick<Movie, 'id'>;
};

type AddActressFormData = {
  name: string;
};

export const AddActressForm: FunctionalComponent<AddActressFormProps> = ({ movie }) => {
  const [formVisible, setFormVisible] = useState(false);

  const { register, handleSubmit } = useForm<AddActressFormData>({
    defaultValues: {
      name: '',
    },
  });

  const open = () => setFormVisible(true);

  const onSubmit = (data: AddActressFormData) => {
    console.log(data);
  };

  return (
    <Fragment>
      <BubbleButton label="+" onClick={open} />
      <Modal visible={formVisible} setVisible={setFormVisible} appearance="slit">
        <Headline2>{i('ACTRESS_FORM_HEADLINE')}</Headline2>
        <QuickInput>
          <Input name="name" ref={register} placeholder="Name" />
          <Button onClick={handleSubmit(onSubmit)}>
            <Icon icon="search" />
          </Button>
        </QuickInput>
      </Modal>
    </Fragment>
  );
};
