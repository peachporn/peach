import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useQuery } from '@apollo/react-hooks';
import { BubbleButton } from '../../../components/components/bubbleButton';
import { Modal } from '../../../components/components/modal';
import { Input } from '../../../components/components/input';
import { i } from '../../i18n/i18n';
import { Headline2 } from '../../../components/components/headline';
import { findActressQuery } from '../../queries/findActress.gql';
import { Loading } from '../../../components/components/loading';

export type AddActressFormProps = {
  movie: Pick<Movie, 'id'>;
};

type AddActressFormData = {
  name: string;
};

export const AddActressForm: FunctionalComponent<AddActressFormProps> = ({ movie }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const { data, loading } = useQuery<FindActressQuery, FindActressQueryVariables>(
    findActressQuery,
    {
      variables: {
        name,
      },
      skip: !name,
    },
  );

  const open = () => setFormVisible(true);

  return (
    <Fragment>
      <BubbleButton label="+" onClick={open} />
      <Modal visible={formVisible} setVisible={setFormVisible} appearance="slit">
        <Headline2>{i('ACTRESS_FORM_HEADLINE')}</Headline2>
        <Input
          appearance="wide"
          name="name"
          placeholder="Name"
          onKeyUp={event => {
            setName(event.target.value);
          }}
        />
        {loading ? (
          <Loading color="peach" />
        ) : !data && name !== '' ? (
          'None found'
        ) : (
          JSON.stringify(data)
        )}
      </Modal>
    </Fragment>
  );
};
