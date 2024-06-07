import { TextField, ModuleFields } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField
      label="Weather Headline"
      name="headline"
      default="Check out this weather"
    />
  </ModuleFields>
);

export const meta = {
  label: 'Weather Module',
};
