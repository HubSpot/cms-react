import { Island } from '@hubspot/cms-components';
import MyButton from './InteractiveComponents/index.js?island';
import './global-sample-react-module.css';
import styles from './sample-react-module.module.css';

export const Component = ({ fieldValues, hublParameters = {} }) => {
  const { defaultCount = 45 } = fieldValues;

  return (
    <div className="sampleReactModuleWrapper">
      <div className={styles['sample-react-module']}>
        <h1>Sample React Module</h1>
        <p>Field Values: {JSON.stringify(fieldValues)}</p>
        <p>HubL Parameters: {JSON.stringify(hublParameters)}</p>
        <p>Module style classes: {JSON.stringify(styles)}</p>

        <Island module={MyButton} defaultCount={defaultCount} />
      </div>
    </div>
  );
};

export { fields } from './fields.js';

export const meta = {
  label: 'Sample React Module Module',
  host_template_types: ['PAGE'],
};
export const defaultModuleConfig = {
  moduleName: 'sample_react_module',
  version: 1,
};
