import { ModuleFields, IconField } from '@hubspot/cms-components/fields';
import { Icon } from '@hubspot/cms-components';

export function Component() {
  return (
    <>
      <h1>Icon Examples</h1>
      <div
        style={{
          height: 200,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {/* The Icon component takes a field path as defined in the "fields" export */}
        <Icon fieldPath="iconExampleOne" />
        <Icon fieldPath="iconExampleTwo" />
        <Icon fieldPath="iconExampleThree" />
      </div>
    </>
  );
}

export const fields = (
  <ModuleFields>
    <IconField
      label="Icon Example One"
      name="iconExampleOne"
      default={{
        name: 'align-left',
      }}
    />
    <IconField
      label="Icon Example Two"
      name="iconExampleTwo"
      default={{
        name: 'align-center',
      }}
    />
    <IconField
      label="Icon Example Three"
      name="iconExampleThree"
      default={{
        name: 'align-right',
      }}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Icon Example',
};
