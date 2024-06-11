import React from 'react';
import { Island } from '@hubspot/cms-components';
import AppIsland from '../../islands/App?island';

export const Component = () => {
  return <Island module={AppIsland} />;
};

export const fields = [];

export const meta = {
  label: 'Router Module',
};
