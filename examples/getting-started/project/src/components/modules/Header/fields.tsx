import React from 'react';
import { MenuField, ModuleFields } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <MenuField label="Navigation" name="default" default="default" />
  </ModuleFields>
);

export const meta = {
  label: 'Header Module',
};
