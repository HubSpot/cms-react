import { Island } from '@hubspot/cms-components';
import WeatherForecast from '../../islands/WeatherForecast.tsx?island';
import { ModuleFields, TextField } from '@hubspot/cms-components/fields';

export function Component({ fieldValues }: any) {
  return (
    <Island
      module={WeatherForecast}
      headline={fieldValues.headline}
      defaultCity={fieldValues.city}
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
    <TextField label="Default City" name="city" default="Boston" />
  </ModuleFields>
);

export const meta = {
  label: 'Weather Module',
};
