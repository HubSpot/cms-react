import { ModuleFields, RichTextField } from '@hubspot/cms-components/fields';
import { RichText, logInfo } from '@hubspot/cms-components';

export function Component(props) {
  logInfo(props);

  return (
    <>
      <h1>Rich Text Example</h1>
      <div
        style={{
          display: 'flex',
        }}
      >
        <RichText fieldPath="richTextField" />
      </div>
    </>
  );
}

export const fields = (
  <ModuleFields>
    <RichTextField
      label="Rich Text Field"
      name="richTextField"
      default="<h2>Rich Text Field</h2><p>Hello CMS React</p>"
    />
  </ModuleFields>
);
export const meta = {
  label: 'Rich Text Example',
};
