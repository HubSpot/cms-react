import dayjs from 'dayjs';
import weatherStyles from '../styles/weather.module.css';
import { getWeatherIcon } from '../utils.ts';
import { ForecastData } from '../constants.ts';

interface WeatherProps {
  city: string;
  forecast: ForecastData[];
}
interface CurrentWeatherCardProps {
  weatherData: WeatherProps;
}

export function CurrentWeatherCard({ weatherData }: CurrentWeatherCardProps) {
  const { forecast, city } = weatherData;
  const currentDay = forecast[0];

  return (
    <div className={weatherStyles.current} key={currentDay.time}>
      <div className={weatherStyles.condition}>
        <img
          src={getWeatherIcon(currentDay.weather_code.toString())}
          alt={`${city}-weather-icon-${currentDay.weather_code}`}
        />
        <h3>
          {currentDay.apparent_temperature_max}&deg;
          <span className={weatherStyles.unit}>F</span>
        </h3>
      </div>
      <h2 className={weatherStyles.city}>{city}</h2>
    </div>
  );
}

interface UpcomingWeatherCardProps {
  weatherData: WeatherProps;
}

export function UpcomingWeatherCard({ weatherData }: UpcomingWeatherCardProps) {
  const { city, forecast } = weatherData;

  return (
    <>
      {forecast?.map((weather, index: number) => {
        if (index === 0) return null;

        return (
          <div className={weatherStyles.card} key={index}>
            <span>{dayjs(weather.time).format('dddd')}</span>
            <img
              src={getWeatherIcon(weather.weather_code.toString())}
              alt={`${city}-weather-icon-${weather.weather_code}`}
            />
            <h3>
              {weather.apparent_temperature_max}&deg;
              <span className={weatherStyles.unit}>F</span>
            </h3>
          </div>
        );
      })}
    </>
  );
}
