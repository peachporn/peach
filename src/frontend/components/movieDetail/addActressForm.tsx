import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BubbleButton } from '../../../components/components/bubbleButton';
import { Modal } from '../../../components/components/modal';
import { Input } from '../../../components/components/input';
import { i } from '../../i18n/i18n';
import { Headline2 } from '../../../components/components/headline';
import { findActressQuery } from '../../queries/findActress.gql';
import { Loading } from '../../../components/components/loading';
import { ActressCard, ActressCardList } from '../../../components/components/actressCard';
import { isTouched } from '../../utils/form';
import {
  addActressToMovieMutation,
  removeActressFromMovieMutation,
} from '../../mutations/updateMovie.gql';
import { NoResult } from '../../../components/components/noResult';
import { Icon } from '../../../components/components/icon';
import { CreateActressForm } from './createActressForm';
import { actressDetailRoute } from '../../utils/route';

export type AddActressFormProps = {
  movieId: Movie['id'];
  actresses: ActressCardActress[];
};

type AddActressFormData = {
  id: number | null;
};

type ActressCardActress = Pick<Actress, 'id' | 'name' | 'picture'>;

export const AddActressForm: FunctionalComponent<AddActressFormProps> = ({
  actresses,
  movieId,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);

  const [name, setName] = useState('');

  const { data, loading, error } = useQuery<FindActressQuery, FindActressQueryVariables>(
    findActressQuery,
    {
      skip: name.length < 3,
      variables: {
        name,
      },
    },
  );

  console.log(error);

  const [actrs, setActrs] = useState<ActressCardActress[]>(actresses);

  const [addActress] = useMutation<AddActressToMovieMutation, AddActressToMovieMutationVariables>(
    addActressToMovieMutation,
  );

  const [removeActress] = useMutation<
    RemoveActressFromMovieMutation,
    RemoveActressFromMovieMutationVariables
  >(removeActressFromMovieMutation);

  const { setValue, getValues, handleSubmit, register, reset } = useForm<AddActressFormData>({
    defaultValues: {
      id: null,
    },
  });

  const resetForm = () => {
    setFormVisible(false);
    setName('');
    reset({
      id: null,
    });
  };

  const addActressSubmit = (actressId: number) =>
    addActress({
      variables: { movieId, actressId },
    }).then(result => {
      toast.success(i('ACTRESS_ADD_SUCCESS'));
      resetForm();
      setActrs(result.data?.addActressToMovie?.actresses || []);
    });

  const removeActressSubmit = (actressId: number) =>
    removeActress({
      variables: { movieId, actressId },
    }).then(result => {
      toast.success(i('ACTRESS_REMOVE_SUCCESS'));
      setActrs(result.data?.removeActressFromMovie?.actresses || []);
    });

  const fetchedActressesWithoutExisting = (data?.actresses || []).filter(
    a => !actrs.map(b => b.id).includes(a.id),
  );

  const focusFirstActress = () => {
    if (fetchedActressesWithoutExisting.length === 1) {
      setValue('name', fetchedActressesWithoutExisting[1]);
    }
  };

  return (
    <div className="add-actress-form">
      <ActressCardList>
        {actrs.map(actress => (
          <ActressCard
            name={actress.name}
            imageUrl={actress.picture}
            url={actressDetailRoute(actress.id)}
            buttonSlot={
              <Icon
                onClick={e => {
                  e.preventDefault();
                  removeActressSubmit(actress.id);
                }}
                icon="close"
              />
            }
          />
        ))}
        <BubbleButton label="+" onClick={open} />
      </ActressCardList>
      <Modal visible={formVisible} setVisible={setFormVisible} appearance="slit">
        <Headline2>{i('ACTRESS_FORM_HEADLINE')}</Headline2>
        <Input
          appearance="wide"
          name="name"
          placeholder="Name"
          autoFocus
          onKeyUp={event => {
            setName(event.target.value);
          }}
          onEnter={focusFirstActress}
        />
        {loading && !data ? (
          <Loading color="peach" />
        ) : !fetchedActressesWithoutExisting.length && name.trim() ? (
          <NoResult
            message={i('ACTRESS_FORM_NORESULT')}
            interactionSlot={
              <CreateActressForm name={name} onSubmit={({ id }) => addActressSubmit(id)} />
            }
          />
        ) : (
          <Fragment>
            <ActressCardList>
              {fetchedActressesWithoutExisting.map(actress => (
                <ActressCard
                  focus={`${getValues().id}` === `${actress.id.toString()}`}
                  name={actress.name}
                  imageUrl={actress.picture}
                  onClick={event => {
                    setValue('id', actress.id);
                    handleSubmit((formData: AddActressFormData) => {
                      if (!formData.id) {
                        return Promise.resolve();
                      }
                      return addActressSubmit(parseInt(`${formData.id}`, 10));
                    })(event);
                  }}
                />
              ))}
            </ActressCardList>
            <input type="hidden" ref={register} name="id" />
          </Fragment>
        )}
      </Modal>
    </div>
  );
};
