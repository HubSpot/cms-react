import { Menu } from '@hubspot/cms-components';

export function Component({ fieldValues, hublParameters }) {
  const { default: navigationMenuId } = fieldValues;
  return (
    <footer>
      <Menu fieldPath={navigationMenuId} />
    </footer>
  );
}

export { fields, meta } from './fields.tsx';
