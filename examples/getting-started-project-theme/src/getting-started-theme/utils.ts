import { logInfo } from '@hubspot/cms-components';
import {
  ApiResponse,
  FORECAST_BASE_URL,
  Forecast,
  ForecastData,
  ICON_MAP,
  LAT_LNG_BASE_URL,
  LocationResponse,
  WeatherForecast,
} from './constants.ts';

// weatherCode's are pulled from the "WMO Weather interpretation codes" section
// of the open-meteo docs: https://open-meteo.com/en/docs
export function getWeatherIcon(weatherCode: string) {
  switch (weatherCode) {
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
    case '80':
    case '81':
    case '82':
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
    const fetchLocationData = await fetch(
      `${LAT_LNG_BASE_URL}?name=${city}&count=1&language=en&format=json`,
    );

    const locationData: LocationResponse = await fetchLocationData.json();

    if (fetchLocationData.status === 200 && !locationData.results) {
      return { city, forecast: undefined };
    }

    const { longitude, latitude } = locationData.results[0];
    const forecastResponse = await fetch(
      `${FORECAST_BASE_URL}?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&forecast_days=3&daily=apparent_temperature_max,weather_code`,
    );

    const forecast: ApiResponse = await forecastResponse.json();
    const transformedForecast = transformResponseData(forecast.daily);

    return { city, forecast: transformedForecast };
  } catch (error) {
    return { city, error, forecast: undefined };
  }
}
