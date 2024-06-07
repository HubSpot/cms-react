import { Menu } from '@hubspot/cms-components';
import headerStyles from '../../../styles/header.module.css';

export function Component({ fieldValues, hublParameters = {} }) {
  const { default: navigationMenuId } = fieldValues;

  return (
    <header className={headerStyles.wrapper}>
      <nav>
        <img
          src="https://cdn2.hubspot.net/hubfs/53/hubspot-logo.svg"
          alt="HubSpot"
        />
        <Menu fieldPath={navigationMenuId} />
        <button>Sign In</button>
      </nav>
    </header>
  );
}

export { fields, meta } from './fields.tsx';
