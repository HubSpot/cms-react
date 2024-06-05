import { Island } from '@hubspot/cms-components';
import React from 'react';
import AppIsland from '../../islands/App?island';

export const Component = () => {
  return (
    <div>
      <Island module={AppIsland} />
    </div>
  );
};

export const fields = [];

export const meta = {
  label: 'Membership app entry point',
};
