import { FunctionalComponent, h } from 'preact';
import { Actress } from '@peach/types';

export type CreateActressFormProps = {
  name: string;
  onSubmit: (actress: Pick<Actress, 'id' | 'name'>) => void;
};

export const CreateActressForm: FunctionalComponent<CreateActressFormProps> = () => null;
