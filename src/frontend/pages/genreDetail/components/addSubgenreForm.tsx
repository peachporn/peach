import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BubbleButton } from '../../../../components/components/bubbleButton';
import { Headline2, Icon, Input, Loading } from '../../../../components';
import {
  GenreCard,
  GenreCardGrid,
  GenreCardList,
} from '../../../../components/components/genreCard';
import { i } from '../../../i18n/i18n';
import { findGenreQuery } from '../../movieDetail/queries/findGenre.gql';
import { genreDetailRoute } from '../../../utils/route';
import { addSubgenreMutation, removeSubgenreMutation } from '../mutations/updateGenre.gql';
import { Modal } from '../../../../components/components/modal';
import { NoResult } from '../../../../components/components/noResult';

type GenreCardGenre = Pick<Genre, 'id' | 'name' | 'category' | 'picture'>;

export type AddSubgenreFormProps = {
  genre: Pick<Genre, 'id'>;
  linkableChildren: GenreCardGenre[];
};

type AddSubgenreFormData = {
  id: number | null;
};

export const AddSubgenreForm: FunctionalComponent<AddSubgenreFormProps> = ({
  genre,
  linkableChildren,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);

  const [name, setName] = useState('');

  const { data, loading } = useQuery<FindGenreQuery, FindGenreQueryVariables>(findGenreQuery, {
    skip: name.length < 3,
    variables: {
      name,
    },
  });

  const [subgenres, setSubgenres] = useState<GenreCardGenre[]>(linkableChildren || []);

  const [addSubgenre] = useMutation<AddSubgenreMutation, AddSubgenreMutationVariables>(
    addSubgenreMutation,
  );

  const [removeSubgenre] = useMutation<RemoveSubgenreMutation, RemoveSubgenreMutationVariables>(
    removeSubgenreMutation,
  );

  const { setValue, getValues, handleSubmit, register, reset } = useForm<AddSubgenreFormData>({
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

  const addSubgenreSubmit = (childId: number) =>
    addSubgenre({
      variables: { parentId: genre.id, childId },
    }).then(result => {
      toast.success(i('SUCCESS'));
      resetForm();
      if (result.data?.addSubgenre) {
        setSubgenres([...subgenres, result.data.addSubgenre]);
      }
    });

  const removeSubgenreSubmit = (childId: number) =>
    removeSubgenre({
      variables: { parentId: genre.id, childId },
    }).then(result => {
      toast.success(i('SUCCESS'));
      if (result.data?.removeSubgenre) {
        setSubgenres(subgenres.filter(g => g.id !== childId));
      }
    });

  const fetchedWithoutExisting = (data?.genres || []).filter(
    a => !subgenres.map(b => b.id).includes(a.id),
  );

  const focusFirstSubgenre = () => {
    if (fetchedWithoutExisting.length === 1) {
      setValue('name', fetchedWithoutExisting[1]);
    }
  };

  return (
    <div className="add-subgenre-form">
      <Headline2>{i('SUBGENRES')}</Headline2>
      <GenreCardList>
        {subgenres.map(g => (
          <GenreCard
            appearance={['small']}
            genre={g}
            url={genreDetailRoute(g.id)}
            buttonSlot={
              <Icon
                onClick={e => {
                  e.preventDefault();
                  removeSubgenreSubmit(g.id);
                }}
                icon="close"
              />
            }
          />
        ))}
        <BubbleButton label="+" onClick={open} />
      </GenreCardList>
      <Modal visible={formVisible} setVisible={setFormVisible} appearance="slit">
        <Headline2>{i('SUBGENRE_FORM_HEADLINE')}</Headline2>
        <Input
          appearance="wide"
          name="name"
          placeholder="Name"
          autoFocus
          onKeyUp={event => {
            setName(event.target.value);
          }}
          onEnter={focusFirstSubgenre}
        />
        {loading && !data ? (
          <Loading color="peach" />
        ) : !fetchedWithoutExisting.length && name.trim() ? (
          <NoResult message={i('SUBGENRE_FORM_NORESULT')} />
        ) : (
          <Fragment>
            <GenreCardGrid>
              {fetchedWithoutExisting.map(g => (
                <GenreCard
                  appearance={['small']}
                  focus={`${getValues().id}` === `${g.id.toString()}`}
                  genre={g}
                  onClick={event => {
                    setValue('id', g.id);
                    handleSubmit((formData: AddSubgenreFormData) => {
                      if (!formData.id) {
                        return Promise.resolve();
                      }
                      return addSubgenreSubmit(parseInt(`${formData.id}`, 10));
                    })(event);
                  }}
                />
              ))}
            </GenreCardGrid>
            <input type="hidden" ref={register} name="id" />
          </Fragment>
        )}
      </Modal>
    </div>
  );
};
