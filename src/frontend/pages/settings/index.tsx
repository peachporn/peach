import { FunctionalComponent, h } from 'preact';
import { Container, Headline1 } from '../../../components';
import { GeneralSettingsForm } from './components/generalSettingsForm';
import { LibraryForm } from './components/libraryForm';
import { i } from '../../i18n/i18n';
import { BasePage } from '../../components/basePage';
import { TasksList } from './components/tasksList';
import { VolumeForm } from './components/volumeForm';

export const SettingsPage: FunctionalComponent = () => (
  <BasePage>
    <Container tall background="white" width="narrow">
      <Headline1>{i('SETTINGS')}</Headline1>
      <GeneralSettingsForm />
      <TasksList />
      <LibraryForm />
      <VolumeForm />
    </Container>
  </BasePage>
);
