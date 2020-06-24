import { FunctionalComponent, h } from 'preact';
import { Headline1 } from '../../components/headline';
import { ActressCard } from '../../components/actressCard';
import { age, diffYears, format } from '../../../utils/date';
import { Text } from '../../components/text';
import { i } from '../../../frontend/i18n/i18n';

export type ActressDetailHeaderProps = {
  actress: Actress;
};

export const ActressDetailHeader: FunctionalComponent<ActressDetailHeaderProps> = ({ actress }) => (
  <section className="actress-detail-header">
    <ActressCard name={actress.name} imageUrl={actress.picture} shadow noName />
    <div className="actress-detail-header__headline">
      <Headline1>{actress.name}</Headline1>
      {!actress.dateOfBirth ? null : (
        <Text size="L">
          {age(new Date(actress.dateOfBirth))}
          {i('ACTRESS_YEARS_OLD')}
        </Text>
      )}
      {!actress.dateOfBirth ? null : (
        <Text>
          {i('ACTRESS_BORN')}
          {format(new Date(actress.dateOfBirth))}
        </Text>
      )}
      {!actress.dateOfCareerstart ? null : (
        <Text>
          {i('ACTRESS_STARTED')}
          {new Date(actress.dateOfCareerstart).getFullYear()}
          {actress.dateOfBirth && i('ACTRESS_AT_AGE')}
          {actress.dateOfBirth &&
            diffYears(new Date(actress.dateOfCareerstart), new Date(actress.dateOfBirth))}
        </Text>
      )}
      {!actress.dateOfRetirement || actress.dateOfDeath ? null : (
        <Text>
          {i('ACTRESS_RETIRED')}
          {new Date(actress.dateOfRetirement).getFullYear()}
          {actress.dateOfBirth && i('ACTRESS_AT_AGE')}
          {actress.dateOfBirth &&
            diffYears(new Date(actress.dateOfRetirement), new Date(actress.dateOfBirth))}
        </Text>
      )}
      {!actress.dateOfDeath ? null : (
        <Text>
          {i('ACTRESS_PASSED_AWAY')}
          {format(new Date(actress.dateOfDeath))}
          {actress.dateOfBirth && i('ACTRESS_AT_AGE')}
          {actress.dateOfBirth &&
            diffYears(new Date(actress.dateOfDeath), new Date(actress.dateOfBirth))}
        </Text>
      )}
    </div>
  </section>
);
