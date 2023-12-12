import React from 'react';
import { ModuleFields, ColorField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <ColorField
      label="Button color"
      name="button_color"
      default={{ color: '#F7761F' }}
    />
  </ModuleFields>
);
