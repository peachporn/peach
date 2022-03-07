import { useQuery } from '@apollo/client';
import { ActressDetailQuery, ActressDetailQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { CoverScreencaps } from '../../components/coverScreencaps';
import { Image } from '../../components/image';
import { Loading } from '../../components/loading';
import { i } from '../../i18n/i18n';
import { formatDate } from '../../utils/date';
import { EditActressForm } from './components/editActressForm';
import { actressDetailQuery } from './queries/actressDetail.gql';
import { dick, looksAndrogynous, looksMale, pussy, tits } from './utils/appearance';
import { screencapsForActress } from './utils/screencapsForActress';

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
    <Fragment>
      <Helmet>
        <title>
          {actress?.name || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <div className="flex flex-col relative">
          <CoverScreencaps screencaps={screencapsForActress(actress || undefined)} />
          <h1 className="block -mt-9 w-full max-w-screen-lg mx-auto font-display text-3xl text-white pl-6 md:pl-0 text-shadow-md">
            {actress?.name || ''}
          </h1>
        </div>
        <section className="bg-white p-8 min-h-screen/2 shadow-lg relative">
          {loading || !actress ? (
            <Loading />
          ) : (
            <Fragment>
              <div className="max-w-screen-lg mx-auto grid grid-cols-2">
                <div>
                  <span className={'pr-2 text-xl'}>
                    {looksAndrogynous(actress) ? '⚲' : looksMale(actress) ? '♂' : '♀'}
                  </span>
                  {!actress.dates?.age ? null : (
                    <Fragment>
                      <span className="text-2xl font-bold">{actress.dates?.age}</span>
                      <span className="mb-2">{i('ACTRESS_YEARS_OLD')}</span>
                    </Fragment>
                  )}
                </div>
                <Image
                  className="row-span-6 md:row-span-20 col-start-2 rounded shadow"
                  alt={actress.name}
                  src={actress.picture || ''}
                />
                {actress.aliases.length === 0 ? null : (
                  <div>
                    <span className="text-gray-400">{i('ACTRESS_ALIASES')}</span>
                    <div>
                      {actress.aliases.map(a => (
                        <span className="block">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                {!dick(actress) && !pussy(actress) ? null : (
                  <div className="mt-4 grid grid-cols-1/2">
                    <span className="text-gray-400">{i('ACTRESS_EQUIPMENT')}</span>
                    <span>
                      {dick(actress)
                        ? i('EQUIPMENT_DICK')
                        : pussy(actress)
                        ? i('EQUIPMENT_PUSSY')
                        : ''}
                    </span>
                  </div>
                )}

                {!tits(actress) ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_CUPSIZE')}</span>
                    <span>
                      {tits(actress)?.size}{' '}
                      {tits(actress)?.hasImplants ? i('ACTRESS_IMPLANTS') : ''}
                    </span>
                  </div>
                )}
                {!actress.appearance?.height ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_HEIGHT')}</span>
                    <span>
                      {actress.appearance?.height} {i('CENTIMETER')}
                    </span>
                  </div>
                )}
                {!actress.appearance?.weight ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_WEIGHT')}</span>
                    <span>
                      {actress.appearance?.weight} {i('KILOGRAM')}
                    </span>
                  </div>
                )}
                {!actress.appearance?.measurements ? null : (
                  <div className="grid grid-cols-3 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_MEASUREMENTS_CHEST')}</span>
                    <span className="text-gray-400">{i('ACTRESS_MEASUREMENTS_HIPS')}</span>
                    <span className="text-gray-400">{i('ACTRESS_MEASUREMENTS_WAIST')}</span>
                    <span>{actress.appearance?.measurements.chest}</span>
                    <span>{actress.appearance?.measurements.hips}</span>
                    <span>{actress.appearance?.measurements.waist}</span>
                  </div>
                )}

                {!actress.appearance?.haircolor ? null : (
                  <div className="grid grid-cols-1/2">
                    <span className="text-gray-400">{i('ACTRESS_HAIRCOLOR')}</span>
                    <span>{actress.appearance?.haircolor}</span>
                  </div>
                )}
                {!actress.appearance?.eyecolor ? null : (
                  <div className="grid grid-cols-1/2">
                    <span className="text-gray-400">{i('ACTRESS_EYECOLOR')}</span>
                    <span>{actress.appearance?.eyecolor}</span>
                  </div>
                )}
                {!actress.appearance?.piercings ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_PIERCINGS')}</span>
                    <span>{actress.appearance?.piercings}</span>
                  </div>
                )}
                {!actress.appearance?.tattoos ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_TATTOOS')}</span>
                    <span>{actress.appearance?.tattoos}</span>
                  </div>
                )}

                {!actress.dates?.dateOfBirth ? null : (
                  <div className="mt-4 grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_DATEOFBIRTH')}</span>
                    <span>{formatDate(actress.dates?.dateOfBirth)}</span>
                  </div>
                )}
                {!actress.dates?.dateOfCareerstart ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_DATEOFCAREERSTART')}</span>
                    <span>{formatDate(actress.dates?.dateOfCareerstart)}</span>
                  </div>
                )}
                {!actress.dates?.dateOfRetirement ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_DATEOFRETIREMENT')}</span>
                    <span>{formatDate(actress.dates?.dateOfRetirement)}</span>
                  </div>
                )}
                {!actress.dates?.dateOfDeath ? null : (
                  <div className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_DATEOFDEATH')}</span>
                    <span>{formatDate(actress.dates?.dateOfDeath)}</span>
                  </div>
                )}
                <span className="grid grid-cols-1/2 col-span-2 md:col-span-1">
                  <span className="text-gray-400">{i('ACTRESS_STATUS')}</span>{' '}
                  {!actress.dates?.inBusiness
                    ? i('ACTRESS_STATUS_RETIRED')
                    : i('ACTRESS_STATUS_IN_BUSINESS')}
                </span>

                {!actress.location?.city &&
                !actress.location?.province &&
                !actress.location?.country ? null : (
                  <div className="mt-4 grid grid-cols-1/2 col-span-2 md:col-span-1 mt-2">
                    <span className="text-gray-400">{i('ACTRESS_LOCATION')}</span>
                    <span>
                      {[
                        actress.location?.city,
                        actress.location?.province,
                        actress.location?.country,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}

                {!actress.contact?.socialMediaLinks?.filter(Boolean).length ? null : (
                  <div className="mt-4 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_SOCIALMEDIA_LINKS')}</span>
                    <div>
                      {actress.contact?.socialMediaLinks.map(link => (
                        <a href={link || undefined} className="block text-pink underline break-all">
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {!actress.contact?.officialWebsite ? null : (
                  <div className="grid grid-cols-2 col-span-2 md:col-span-1">
                    <span className="text-gray-400">{i('ACTRESS_OFFICIAL_WEBSITE')}</span>
                    <span>{actress.contact?.officialWebsite}</span>
                  </div>
                )}
              </div>
              <EditActressForm actress={actress} onSubmit={refetch} />
            </Fragment>
          )}
        </section>
      </main>
    </Fragment>
  );
};
