import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  ActressDetailFragment,
  ActressDetailQuery,
  ActressDetailQueryVariables,
} from '@peach/types';
import { actressDetailQuery } from './queries/actressDetail.gql';
import { Image } from '../../components/image';
import { Loading } from '../../components/loading';
import { shuffle } from '../../utils/list';
import { i } from '../../i18n/i18n';
import { formatDate } from '../../utils/date';
import { EditActressForm } from './components/editActressForm';

const screencapsForActress = (actress?: ActressDetailFragment) =>
  shuffle(
    [
      ...(actress?.movies || []).map(m => ({
        movie: m,
        screencap: m.screencaps.find(s => s.cover),
      })),
      ...(actress?.movies || []).flatMap(m =>
        m.screencaps
          .filter(s => !s.cover)
          .map(s => ({
            movie: m,
            screencap: s,
          })),
      ),
    ]
      .filter(Boolean)
      .slice(0, 6),
  );

export type ActressDetailPageProps = {
  actressId: string;
};

export const ActressDetailPage: FunctionalComponent = () => {
  const history = useHistory();
  const params = useParams<ActressDetailPageProps>();

  const actressId = parseInt(params.actressId, 10);
  if (!actressId) {
    return null;
  }

  const { loading, data, refetch } = useQuery<ActressDetailQuery, ActressDetailQueryVariables>(
    actressDetailQuery,
    {
      variables: {
        id: actressId,
      },
    },
  );

  const actress = data?.actress;

  return (
    <main className="pb-12">
      <div className="flex flex-col relative">
        <div className="grid grid-cols-2 min-h-screen/2">
          {screencapsForActress(actress).map(({ movie, screencap }) => (
            <Image
              className="filter-grayscale blend-multiply opacity-70 -z-1 min-w-full min-h-full object-cover"
              alt={movie.title}
              src={screencap?.src}
            />
          ))}
        </div>
        <h1 className="absolute bottom-0 font-display text-3xl text-white pl-6 text-shadow-md">
          {actress?.name || ''}
        </h1>
      </div>
      <section className="bg-white p-8 min-h-screen/2 shadow-lg relative">
        {loading || !actress ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="flex flex-col">
              <div className="flex mb-3">
                <div className="flex flex-col w-1/2 justify-start pr-2">
                  {!actress.age ? null : (
                    <Fragment>
                      <span className="text-2xl font-bold">{actress.age}</span>
                      <span className="mb-2">{i('ACTRESS_YEARS_OLD')}</span>
                    </Fragment>
                  )}
                  <span className="text-gray-400">{i('ACTRESS_STATUS')}</span>
                  <span className="mb-2">
                    {!actress.inBusiness
                      ? i('ACTRESS_STATUS_RETIRED')
                      : i('ACTRESS_STATUS_IN_BUSINESS')}
                  </span>
                  {actress.aliases.length === 0 ? null : (
                    <Fragment>
                      <span className="text-gray-400">{i('ACTRESS_ALIASES')}</span>
                      <div>
                        {actress.aliases.map(a => (
                          <span className="block">{a}</span>
                        ))}
                      </div>
                    </Fragment>
                  )}
                </div>
                <Image className="w-1/2 rounded shadow" alt={actress.name} src={actress.picture} />
              </div>
              <div className="flex flex-col w-full justify-between">
                <div className="mb-4">
                  {!actress.ethnicity ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_ETHNICITY')}</span>
                      <span>{actress.ethnicity}</span>
                    </div>
                  )}
                  {!actress.haircolor ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_HAIRCOLOR')}</span>
                      <span>{actress.haircolor}</span>
                    </div>
                  )}
                  {!actress.eyecolor ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_EYECOLOR')}</span>
                      <span>{actress.eyecolor}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  {!actress.dateOfBirth ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_DATEOFBIRTH')}</span>
                      <span>{formatDate(actress.dateOfBirth)}</span>
                    </div>
                  )}
                  {!actress.dateOfCareerstart ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_DATEOFCAREERSTART')}</span>
                      <span>{formatDate(actress.dateOfCareerstart)}</span>
                    </div>
                  )}
                  {!actress.dateOfRetirement ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_DATEOFRETIREMENT')}</span>
                      <span>{formatDate(actress.dateOfRetirement)}</span>
                    </div>
                  )}
                  {!actress.dateOfDeath ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_DATEOFDEATH')}</span>
                      <span>{formatDate(actress.dateOfDeath)}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  {!actress.city && !actress.province && !actress.country ? null : (
                    <div className="grid grid-cols-2 mt-2">
                      <span className="text-gray-400">{i('ACTRESS_LOCATION')}</span>
                      <span>
                        {[actress.city, actress.province, actress.country]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  {!actress.cupsize ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_CUPSIZE')}</span>
                      <span>{actress.cupsize}</span>
                    </div>
                  )}
                  {!actress.boobs ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_BOOBS')}</span>
                      <span>{actress.boobs}</span>
                    </div>
                  )}
                  {!actress.height ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_HEIGHT')}</span>
                      <span>
                        {actress.height} {i('CENTIMETER')}
                      </span>
                    </div>
                  )}
                  {!actress.weight ? null : (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-400">{i('ACTRESS_WEIGHT')}</span>
                      <span>
                        {actress.weight} {i('KILOGRAM')}
                      </span>
                    </div>
                  )}
                  {!actress.measurements ? null : (
                    <div className="grid grid-cols-3">
                      <span className="text-gray-400">{i('ACTRESS_MEASUREMENTS_BUST')}</span>
                      <span className="text-gray-400">{i('ACTRESS_MEASUREMENTS_HIPS')}</span>
                      <span className="text-gray-400">{i('ACTRESS_MEASUREMENTS_WAIST')}</span>
                      <span>{actress.measurements.bust}</span>
                      <span>{actress.measurements.hips}</span>
                      <span>{actress.measurements.waist}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                {!actress.piercings ? null : (
                  <div className="grid grid-cols-1/2">
                    <span className="text-gray-400">{i('ACTRESS_PIERCINGS')}</span>
                    <span>{actress.piercings}</span>
                  </div>
                )}
                {!actress.tattoos ? null : (
                  <div className="grid grid-cols-1/2">
                    <span className="text-gray-400">{i('ACTRESS_TATTOOS')}</span>
                    <span>{actress.tattoos}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                {!actress.socialMediaLinks?.filter(Boolean).length ? null : (
                  <Fragment>
                    <span className="text-gray-400">{i('ACTRESS_SOCIALMEDIA_LINKS')}</span>
                    <div>
                      {actress.socialMediaLinks.map(link => (
                        <a href={link} className="block text-pink underline">
                          {link}
                        </a>
                      ))}
                    </div>
                  </Fragment>
                )}
                {!actress.officialWebsite ? null : (
                  <div className="grid grid-cols-2">
                    <span className="text-gray-400">{i('ACTRESS_OFFICIAL_WEBSITE')}</span>
                    <span>{actress.officialWebsite}</span>
                  </div>
                )}
              </div>
            </div>
            <EditActressForm actress={actress} onSubmit={refetch} />
          </Fragment>
        )}
      </section>
    </main>
  );
};
