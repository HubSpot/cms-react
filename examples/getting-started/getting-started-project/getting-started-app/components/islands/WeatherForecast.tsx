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
      setWeatherData(JSON.parse(data as string));
    });
  }, []);

  const handleFetchWeather = () => {
    getWeatherForecast(city, apiKey).then((data) => {
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
