import { FunctionalComponent, h } from 'preact';
import { Container, Headline1 } from '../../components';
import { i } from '../i18n/i18n';
import { VolumeForm } from '../components/settings/volumeForm';
import { GeneralSettingsForm } from '../components/settings/generalSettingsForm';
import { LibraryForm } from '../components/settings/libraryForm';
import { BasePage } from './basePage';

export const SettingsPage: FunctionalComponent = () => (
  <BasePage>
    <Container tall background="white" width="narrow">
      <Headline1>{i('SETTINGS')}</Headline1>
      <GeneralSettingsForm />
      <LibraryForm />
      <VolumeForm />
    </Container>
  </BasePage>
);
