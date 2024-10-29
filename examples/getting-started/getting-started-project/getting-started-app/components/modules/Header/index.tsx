import React from 'react';
import { Menu, logInfo } from '@hubspot/cms-components';
import {
  ImageField,
  MenuField,
  ModuleFields,
} from '@hubspot/cms-components/fields';
import logo from '../../../assets/sprocket.svg';
import headerStyles from '../../../styles/header.module.css';

export function Component({ fieldValues }: any) {
  const { src, alt, width, height } = fieldValues.logo;

  return (
    <header className={headerStyles.wrapper}>
      <nav>
        <img src={src} alt={alt} width={width} height={height} />
        <Menu fieldPath="menu" />
      </nav>
    </header>
  );
}

const DEFAULT_MENU_ID = '<YOUR_DEFAULT_MENU_ID';

export const fields = (
  <ModuleFields>
    <ImageField
      name="logo"
      label="Logo"
      default={{ src: logo, height: 100, alt: 'Logo for navigation' }}
      resizable={true}
    />
    <MenuField name="menu" label="Menu" default={DEFAULT_MENU_ID} />
  </ModuleFields>
);

export const meta = {
  label: 'Header Module',
};
