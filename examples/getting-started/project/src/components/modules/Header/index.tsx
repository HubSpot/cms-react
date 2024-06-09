import { ImageField, ModuleFields } from '@hubspot/cms-components/fields';

export function Component({ fieldValues }) {
  return <img src={fieldValues.logo} alt="Logo" />;
}

export const fields = (
  <ModuleFields>
    <ImageField
      name="logo"
      label="Logo"
      default={{ src: '../../../assets/sprocket.svg' }}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Header Module',
};
