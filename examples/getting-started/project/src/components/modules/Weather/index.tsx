import React from 'react';
import { Island } from '@hubspot/cms-components';
import WeatherForecast from '../../islands/WeatherForecast.tsx?island';

export function Component({ fieldValues }) {
  return <Island module={WeatherForecast} headline={fieldValues.headline} />;
}

export { fields, meta } from './fields.tsx';
