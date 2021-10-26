import { FunctionalComponent, h } from 'preact';
import { PropRef } from 'preact/hooks';
import { GenreClip } from '../../../../../components/genreClip';
import { Icon } from '../../../../../components/icon';
import { MovieHighlightForm } from '../../../hooks/useMovieHighlightForm';
import { DisplayableGenre } from '../display';
import { removeChildFromGenreDefinition } from '../genreLink';
import { GenreDefinitionDraft } from '../types';
import { jumpToTime } from '../video';

export type GenreFormClipProps = {
  genreDefinition: DisplayableGenre | GenreDefinitionDraft;

  genreDefinitions: GenreDefinitionDraft[];
  setGenreDefinitions: (g: GenreDefinitionDraft[]) => void;
  video: PropRef<HTMLVideoElement | undefined>;

  form: MovieHighlightForm;

  focusedGenre: GenreDefinitionDraft | null;
  focusGenre: (g: GenreDefinitionDraft | null) => void;
};

export const GenreFormClip: FunctionalComponent<GenreFormClipProps> = ({
  genreDefinition,
  setGenreDefinitions,
  genreDefinitions,
  focusGenre,
  form,
  focusedGenre,
  video,
}) => {
  const removeSubgenreFromGenre = (g: GenreDefinitionDraft, childId: number) => {
    setGenreDefinitions(removeChildFromGenreDefinition(g, childId)(genreDefinitions));
  };

  const removeGenreDefinition = (genre: GenreDefinitionDraft) => {
    focusGenre(null);
    setGenreDefinitions(
      genreDefinitions.filter(
        g => !(g.timeStart === genre.timeStart && g.genre.parent.id === genre.genre.parent.id),
      ),
    );
    form.reset();
  };

  return (
    <GenreClip
      size="12"
      style={
        !('gridColumnStart' in genreDefinition)
          ? {}
          : {
              gridColumnStart: genreDefinition.gridColumnStart?.toString(),
              gridColumnEnd: `span ${genreDefinition.gridColumnSpan}`,
            }
      }
      key={genreDefinition.genre.parent.id}
      genre={genreDefinition.genre.parent}
      focus={
        focusedGenre?.timeStart === genreDefinition.timeStart &&
        focusedGenre.genre.parent.id === genreDefinition.genre.parent.id
      }
      descriptionSlot={<span>{genreDefinition.genre.parent.name}</span>}
      interactionSlot={
        <Icon
          className="genre-clip__delete"
          icon="close"
          onClick={() => {
            removeGenreDefinition(genreDefinition);
          }}
        />
      }
      onDblClick={e => {
        e.stopPropagation();
        jumpToTime(genreDefinition.timeStart, video);
      }}
      onClick={e => {
        e.stopPropagation();
        if (focusedGenre && focusedGenre.timeStart === genreDefinition.timeStart) {
          focusGenre(null);
          return;
        }

        focusGenre(genreDefinition);
      }}
    >
      {genreDefinition.genre.children.length === 0 ? null : (
        <div className="flex self-end">
          {genreDefinition.genre.children.map(c => (
            <GenreClip
              size="8"
              key={c.id}
              genre={c}
              descriptionSlot={<span>{c.name}</span>}
              onClick={e => {
                e.stopPropagation();
                removeSubgenreFromGenre(genreDefinition, c.id);
              }}
            />
          ))}
        </div>
      )}
    </GenreClip>
  );
};

export const GenreDisplayClip: FunctionalComponent<GenreFormClipProps> = ({
  genreDefinition,
  video,
}) => (
  <GenreClip
    size="12"
    style={
      !('gridColumnStart' in genreDefinition)
        ? {}
        : {
            gridColumnStart: genreDefinition.gridColumnStart?.toString(),
            gridColumnEnd: `span ${genreDefinition.gridColumnSpan}`,
          }
    }
    key={genreDefinition.genre.parent.id}
    genre={genreDefinition.genre.parent}
    descriptionSlot={<span>{genreDefinition.genre.parent.name}</span>}
    onClick={e => {
      e.stopPropagation();
      jumpToTime(genreDefinition.timeStart, video);
    }}
  >
    {genreDefinition.genre.children.length === 0 ? null : (
      <div className="flex self-end">
        {genreDefinition.genre.children.map(c => (
          <GenreClip size="8" key={c.id} genre={c} descriptionSlot={<span>{c.name}</span>} />
        ))}
      </div>
    )}
  </GenreClip>
);
