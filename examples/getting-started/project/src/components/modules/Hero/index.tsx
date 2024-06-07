import React from 'react';
import heroStyles from '../../../styles/hero.module.css';
import { Island } from '@hubspot/cms-components';
import Weather from '../../islands/Weather.tsx?island';
import WeatherForecast from '../../islands/WeatherForecast.tsx';

export function Component({ fieldValues, hublParameters = {} }) {
  return (
    <div className={heroStyles.wrapper}>
      <h1>GET THAT WEATHER</h1>
    </div>
  );
}

export { fields, meta } from './fields.tsx';

// /scopeCheck

// --tmp-dir-to-keep
// cms-js-internal isn't a real package, its a weird pseudo package that doesn't exist properly
// and the result of that is when you are working locally, you wont' see updates unless you restart the project
// byron doesn'know why the watch command isn't picking up those changes

// url, query , request info will come from CF
// contact will come from renderer

// whent he CF worker talks to render lambda and does a node fetch that is special where it has a caching mechanism
