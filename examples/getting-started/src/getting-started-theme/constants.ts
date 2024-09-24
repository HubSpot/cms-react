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

export const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast'; // https://open-meteo.com/en/docs
export const LAT_LNG_BASE_URL =
  'https://geocoding-api.open-meteo.com/v1/search';

export interface Forecast {
  time: string[];
  apparent_temperature_max: number[];
  weather_code: number[];
}

export interface ForecastData {
  time: string;
  apparent_temperature_max: number;
  weather_code: number;
}

interface LocationResult {
  latitude: number;
  longitude: number;
}

export interface LocationResponse {
  results: LocationResult[];
}

export interface ForecastResponse {
  daily: Forecast;
}

export interface WeatherForecast {
  city: string;
  forecast: ForecastData[];
  error?: string;
}

interface DailyUnits {
  time: string;
  apparent_temperature_max: string;
  weather_code: string;
}

export interface ApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Forecast;
}
