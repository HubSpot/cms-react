import { useEffect, useState } from 'react';
import weatherStyles from '../../styles/weather.module.css';
import { getWeatherForecast } from '../../utils.ts';
import { CurrentWeatherCard, UpcomingWeatherCard } from '../WeatherCards.tsx';

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

type WeatherForecastProps = {
  headline: string;
  defaultCity: string;
};

export default function WeatherForecast({
  headline,
  defaultCity,
}: WeatherForecastProps) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData>();

  useEffect(() => {
    getWeatherForecast(defaultCity).then((data) => {
      setWeatherData(JSON.parse(data as string));
    });
  }, []);

  const handleFetchWeather = () => {
    getWeatherForecast(city).then((data) => {
      setWeatherData(JSON.parse(data as string));
    });
  };

  return (
    <div className={weatherStyles.wrapper}>
      <h2>{headline}</h2>
      <div className={weatherStyles.form}>
        <input
          type="text"
          placeholder="Enter city"
          onChange={(event) => setCity(event.target.value)}
        />
        <button onClick={handleFetchWeather}>Update Forecast</button>
      </div>
      {weatherData?.forecast ? (
        <>
          <div className={weatherStyles.currentWeather}>
            <CurrentWeatherCard weatherData={weatherData} />
          </div>
          <div className={weatherStyles.cardContainer}>
            {weatherData.forecast.forecastday.map((weather: any, i) => {
              if (i === 0) return null;
              return (
                <UpcomingWeatherCard key={weather.date} weatherData={weather} />
              );
            })}
          </div>
        </>
      ) : (
        <h2>No data found, please search another location</h2>
      )}
    </div>
  );
}
