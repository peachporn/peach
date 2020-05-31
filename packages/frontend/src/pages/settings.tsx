import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import {
  Container,
  Headline1,
  Headline2,
  Select,
  Table,
  TableCell,
  TableRow,
} from '@peach/components';
import { SettingsContext } from '../context/settings';
import { i } from '../i18n/i18n';
import { Language } from '../generated/types';
import { VolumeForm } from '../components/volumeForm';

export const SettingsPage: FunctionalComponent = () => {
  const settings = useContext(SettingsContext);

  return (
    <Container background="white" width="narrow">
      <Headline1>Settings</Headline1>
      <Headline2>General</Headline2>
      <Table>
        <TableRow>
          <TableCell>{i('SETTINGS_LANGUAGE')}</TableCell>
          <TableCell>
            <Select>
              <option selected={settings.language === Language.En} value={Language.En}>
                {i('SETTINGS_LANGUAGE_EN')}
              </option>
            </Select>
          </TableCell>
        </TableRow>
      </Table>
      <Headline2>Volumes</Headline2>
      <VolumeForm volumes={settings.volumes} />
    </Container>
  );
};
