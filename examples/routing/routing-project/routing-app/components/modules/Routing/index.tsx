import React from 'react';
import { Island } from '@hubspot/cms-components';
import AppIsland from '../../islands/App.tsx?island';

export const Component = () => {
  return (
    <>
      <h1>{`Hello`}</h1>
      <Island module={AppIsland} />
    </>
  );
};

export const fields = [];

export const meta = {
  label: `Routing Module`,
};
