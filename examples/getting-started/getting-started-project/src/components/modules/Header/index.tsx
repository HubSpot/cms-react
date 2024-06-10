import React from 'react';
import { Menu, logInfo } from '@hubspot/cms-components';
import {
  ImageField,
  MenuField,
  ModuleFields,
} from '@hubspot/cms-components/fields';
import logo from '../../../assets/sprocket.svg';
import headerStyles from '../../../styles/header.module.css';

export function Component({ fieldValues }) {
  return (
    <header className={headerStyles.wrapper}>
      <nav>
        <img src={fieldValues.logo.src} alt="Logo" width={100} />
        <Menu fieldPath="menu" />
      </nav>
    </header>
  );
}

const DEFAULT_MENU_ID = '53522818668';

export const fields = (
  <ModuleFields>
    <ImageField
      name="logo"
      label="Logo"
      default={{ src: logo }}
      resizable={true}
    />
    <MenuField name="menu" label="Menu" default={DEFAULT_MENU_ID} />
  </ModuleFields>
);

export const meta = {
  label: 'Header Module',
};
