import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Actress,
  AddActressToMovieMutation,
  AddActressToMovieMutationVariables,
  FindActressQuery,
  FindActressQueryVariables,
  Movie,
  RemoveActressFromMovieMutation,
  RemoveActressFromMovieMutationVariables,
} from '@peach/types';
import { i } from '../../../i18n/i18n';
import { findActressQuery } from '../queries/findActress.gql';
import { actressDetailRoute } from '../../../utils/route';
import { Headline2 } from '../../../../../components/src';
import { Loading } from '../../../components/loading';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { ActressCard } from '../../../components/actressCard';

export type AddActressFormProps = {
  existingActresses: ActressCardActress[];
};

type AddActressFormData = {
  id: number | null;
};

type ActressCardActress = Pick<Actress, 'id' | 'name' | 'picture'>;

export const AddActressForm: FunctionalComponent<AddActressFormProps> = ({
  existingActresses = [],
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);

  const [name, setName] = useState('');

  const { data, loading } = useQuery<FindActressQuery, FindActressQueryVariables>(
    findActressQuery,
    {
      skip: name.length < 3,
      variables: {
        name,
      },
    },
  );

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
      setValue('id', fetchedActressesWithoutExisting[1]);
    }
  };

  return (
    <div className="add-actress-form">
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
      <button onClick={open}>+</button>
      <Modal visible={formVisible} setVisible={setFormVisible}>
        <Headline2>{i('ACTRESS_FORM_HEADLINE')}</Headline2>
        <input
          name="name"
          placeholder="Name"
          autoFocus
          onKeyUp={event => {
            if (event.key === 'Enter') {
              focusFirstActress();
              return;
            }
            setName((event.target as HTMLInputElement)?.value);
          }}
        />
        {loading && !data ? (
          <Loading />
        ) : !fetchedActressesWithoutExisting.length && name.trim() ? (
          <Fragment>Nothing here...</Fragment>
        ) : (
          <Fragment>
            <div>
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
                      // @ts-ignore
                    })(event);
                  }}
                />
              ))}
            </div>
            <input type="hidden" ref={register} name="id" />
          </Fragment>
        )}
      </Modal>
    </div>
  );
};
