import { ModuleFields, ChoiceField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <ChoiceField
      name="layout"
      label="Layout"
      default="Table"
      choices={[
        ['Table', 'Table'],
        ['Card', 'Card'],
      ]}
    />
  </ModuleFields>
);
