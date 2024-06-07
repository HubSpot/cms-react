import { ModuleFields, TextField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField label="Title" name="title" />
    <TextField label="Subtitle" name="subtitle" />
  </ModuleFields>
);

export const meta = {
  label: 'Hero Module',
};
