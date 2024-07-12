import { Island } from '@hubspot/cms-components';
import WeatherForecast from '../../islands/WeatherForecast.tsx?island';
import { ModuleFields, TextField } from '@hubspot/cms-components/fields';

export function Component({ fieldValues }: any) {
  const { defaultCity, headline } = fieldValues;
  return (
    <Island
      module={WeatherForecast}
      headline={headline}
      defaultCity={defaultCity}
    />
  );
}

export const fields = (
  <ModuleFields>
    <TextField
      label="Weather Headline"
      name="headline"
      default="Get the latest weather forecast"
    />
    <TextField label="Default City" name="defaultCity" default="Boston" />
  </ModuleFields>
);

export const meta = {
  label: 'Weather Module',
};
