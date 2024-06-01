import React from 'react';
import { Island } from '@hubspot/cms-components';
import AppIsland from '../../islands/App.tsx?island';

export const Component = () => {
  return (
    <div style={{ padding: '25px 75px' }}>
      <Island module={AppIsland} />
    </div>
  );
};

export const fields = [];

export const meta = {
  label: `Routing Module`,
};
