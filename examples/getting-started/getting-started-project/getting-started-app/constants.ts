import CLEAR from './assets/clear.svg';
import RAIN from './assets/rain.svg';
import SNOW from './assets/snow.svg';
import THUNDERSTORM from './assets/thunderstorm.svg';
import FOG from './assets/fog.svg';
import CLOUDY from './assets/cloudy.svg';

export const ICON_MAP = {
  CLEAR,
  RAIN,
  SNOW,
  THUNDERSTORM,
  FOG,
  CLOUDY,
};

export type CurrentWeather = Record<string, number | string | WeatherCondition>;
type Location = Record<string, number | string>;

type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

type DailyForecast = Record<string, string | number | Day>;

type Day = {
  day: Record<string, number | WeatherCondition>;
};

type Forecast = {
  forecastday: DailyForecast[];
};

export type WeatherResponse = WeatherData | WeatherError;

export type WeatherData = {
  error: false;
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
};
export type WeatherError = {
  error: 'Forbidden' | 'Unauthorized' | 'Unknown';
  forecast: undefined;
};
