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

export type CurrentWeather = Record<string, number | string | WeatherCondition>;
type Location = Record<string, number | string>;

export type WeatherData = {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
};
