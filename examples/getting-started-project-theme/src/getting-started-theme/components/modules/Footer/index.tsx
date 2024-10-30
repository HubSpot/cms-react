import { ModuleFields, TextField } from '@hubspot/cms-components/fields';
import footerStyles from '../../../styles/footer.module.css';

export function Component({ fieldValues }: any) {
  return (
    <footer className={footerStyles.footer}>
      <p>{fieldValues.footerText}</p>
    </footer>
  );
}

export const fields = (
  <ModuleFields>
    <TextField label="Footer Text" name="footerText" default="Be Well." />
  </ModuleFields>
);

export const meta = {
  label: 'Footer Module',
};
