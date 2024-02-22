import { ModuleFields, IconField } from '@hubspot/cms-components/fields';
import { Icon, logInfo } from '@hubspot/cms-components';

export function Component(props) {
  logInfo(props);

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
        <Icon fieldPath="iconExampleOne" iconStyle="LIGHT" />
        <Icon fieldPath="iconExampleTwo" iconStyle="OUTLINE" />
        <Icon fieldPath="iconExampleThree" iconStyle="SOLID" />
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
