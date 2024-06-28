import { useEffect, useState } from 'react';
import weatherStyles from '../../styles/weather.module.css';
import { getWeatherForecast } from '../../utils.ts';
import { CurrentWeatherCard, UpcomingWeatherCard } from '../WeatherCards.tsx';
import { WeatherResponse } from '../../constants.ts';

type WeatherForecastProps = {
  headline: string;
  defaultCity: string;
  apiKey: string;
};

export default function WeatherForecast({
  headline,
  defaultCity,
  apiKey,
}: WeatherForecastProps) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse>();

  useEffect(() => {
    getWeatherForecast(defaultCity, apiKey).then((data) => {
      setWeatherData(data);
    });
  }, []);

  const handleFetchWeather = () => {
    getWeatherForecast(city, apiKey).then((data) => {
      setWeatherData(data);
    });
  };

  const isFetching = !weatherData;
  const hasError = !isFetching && weatherData?.error;
  const hasData = !isFetching && !hasError && weatherData?.forecast;
  const missingData = !isFetching && !hasData && !hasError;

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

      {isFetching && <h2>Loading...</h2>}
      {hasError && <WeatherError error={weatherData.error} />}
      {hasData && <WeatherData weatherData={weatherData} />}
      {missingData && <h2>No data found, please search another location</h2>}
    </div>
  );
}

function WeatherError({ error }: { error: string }) {
  if (error === 'Forbidden' || error === 'Unauthorized') {
    return <h2>API key is invalid or missing</h2>;
  }
  return <h2>Unknown error with weather API</h2>;
}

function WeatherData({ weatherData }) {
  return (
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
  );
}
