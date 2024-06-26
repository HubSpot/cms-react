import { ICON_MAP } from './constants.ts';

export function getWeatherIcon(type: string) {
  switch (type) {
    case 'Sunny':
    case 'Clear':
      return ICON_MAP.CLEAR;

    case 'Partly Cloudy':
    case 'Cloudy':
    case 'Overcast':
      return ICON_MAP.CLOUDY;

    case 'Mist':
    case 'Patchy rain possible':
    case 'Light drizzle':
    case 'Light rain':
    case 'Moderate rain at times':
    case 'Moderate rain':
    case 'Heavy rain at times':
    case 'Heavy rain':
    case 'Light rain shower':
    case 'Moderate or heavy rain shower':
    case 'Torrential rain shower':
    case 'Patchy light rain':
    case 'Freezing drizzle':
    case 'Heavy freezing drizzle':
    case 'Light freezing rain':
    case 'Moderate or heavy freezing rain':
    case 'Patchy rain nearby':
      return ICON_MAP.RAIN;

    case 'Patchy snow possible':
    case 'Light snow':
    case 'Moderate snow':
    case 'Heavy snow':
    case 'Patchy light snow':
    case 'Patchy moderate snow':
    case 'Patchy heavy snow':
    case 'Blizzard':
    case 'Blowing snow':
    case 'Light snow showers':
    case 'Moderate or heavy snow showers':
    case 'Patchy light snow with thunder':
    case 'Moderate or heavy snow with thunder':
    case 'Patchy sleet possible':
    case 'Light sleet':
    case 'Moderate or heavy sleet':
    case 'Light sleet showers':
    case 'Moderate or heavy sleet showers':
    case 'Ice pellets':
    case 'Light showers of ice pellets':
    case 'Moderate or heavy showers of ice pellets':
      return ICON_MAP.SNOW;

    case 'Thundery outbreaks possible':
    case 'Patchy light rain with thunder':
    case 'Moderate or heavy rain with thunder':
      return ICON_MAP.THUNDERSTORM;

    case 'Fog':
    case 'Freezing fog':
      return ICON_MAP.FOG;

    default:
      return '';
  }
}

const apiKey = '<YOUR_API_KEY>';

const baseApiUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
  },
};

export async function getWeatherForecast(city: string) {
  try {
    const response = await fetch(`${baseApiUrl}?q=${city}&days=3`, options);
    const result = await response.text();
    return result as string;
  } catch (error) {
    console.error(error);
  }
}
