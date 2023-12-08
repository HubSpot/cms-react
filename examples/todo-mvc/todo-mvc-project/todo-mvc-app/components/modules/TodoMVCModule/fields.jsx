import React from 'react';
import { ModuleFields, TextField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField
      label="Placeholder text"
      name="todoPlaceholder"
      default="What needs to be done? :doit:"
      required
    />
  </ModuleFields>
);
