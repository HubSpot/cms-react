import { ICON_MAP } from './constants.ts';

const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast'; // https://open-meteo.com/en/docs
const LAT_LNG_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

interface Forecast {
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

interface LocationResponse {
  results: LocationResult[];
}

interface ForecastResponse {
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

// codes pulled from the "WMO Weather interpretation codes" section of the open-meteo docs: https://open-meteo.com/en/docs
export function getWeatherIcon(type: string) {
  switch (type) {
    case '0':
    case '1':
    case 'Clear':
      return ICON_MAP.CLEAR;

    case '2':
    case '3':
      return ICON_MAP.CLOUDY;

    case '51':
    case '53':
    case '55':
    case '56':
    case '57':
    case '61':
    case '63':
    case '65':
    case '66':
    case '67':
      return ICON_MAP.RAIN;

    case '71':
    case '73':
    case '75':
    case '77':
    case '85':
    case '86':
      return ICON_MAP.SNOW;

    case '95':
    case '96':
    case '99':
      return ICON_MAP.THUNDERSTORM;

    case '45':
    case '48':
      return ICON_MAP.FOG;

    default:
      return '';
  }
}

function transformResponseData(data: Forecast): ForecastData[] {
  const { time, apparent_temperature_max, weather_code } = data;
  const transformedData = time.map((day: string, index: number) => ({
    time: day,
    apparent_temperature_max: apparent_temperature_max[index],
    weather_code: weather_code[index],
  }));

  return transformedData;
}

export async function getWeatherForecast(
  city: string,
): Promise<WeatherForecast> {
  try {
    const locationResponse = await fetch(
      `${LAT_LNG_BASE_URL}?name=${city}&count=1&language=en&format=json`,
    );
    const { results }: LocationResponse = await locationResponse.json();
    const { latitude, longitude } = results[0];

    const forecastResponse = await fetch(
      `${FORECAST_BASE_URL}?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=3&daily=apparent_temperature_max,weather_code`,
    );

    const forecast: ForecastResponse = await forecastResponse.json();
    const transformedForecast = transformResponseData(forecast.daily);

    return { city, forecast: transformedForecast };
  } catch (error) {
    console.error(error);
    return { city: undefined, forecast: undefined, error };
  }
}
