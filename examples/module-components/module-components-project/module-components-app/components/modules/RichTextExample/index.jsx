import { ModuleFields, RichTextField } from '@hubspot/cms-components/fields';
import { RichTextFieldWrapper, logInfo } from '@hubspot/cms-components';

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
        <RichTextFieldWrapper fieldValue={props.fieldValues.richTextField} />
      </div>
    </>
  );
}

export const fields = (
  <ModuleFields>
    <RichTextField
      label="Rich Text Field"
      name="richTextField"
      default="<h1>Rich Text Field</h1><p>Hello World</p>"
    />
  </ModuleFields>
);
export const meta = {
  label: 'Rich Text Example',
};
