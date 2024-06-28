import { useEffect, useState } from 'react';
import weatherStyles from '../../styles/weather.module.css';
import {
  WeatherForecast as WeatherForecastType,
  getWeatherForecast,
} from '../../utils.ts';
import { CurrentWeatherCard, UpcomingWeatherCard } from '../WeatherCards.tsx';

interface WeatherForecastProps {
  headline: string;
  defaultCity: string;
}

export default function WeatherForecast({
  headline,
  defaultCity,
}: WeatherForecastProps) {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherForecastType>();

  useEffect(() => {
    getWeatherForecast(defaultCity).then((data) => {
      setWeatherData(data);
      setIsLoading(false);
    });
  }, []);

  const handleFetchWeather = () => {
    setIsLoading(true);
    getWeatherForecast(city).then((data) => {
      setWeatherData(data);
      setIsLoading(false);
    });
  };

  return (
    <div className={weatherStyles.wrapper}>
      <h1>{headline}</h1>
      <div className={weatherStyles.form}>
        <input
          type="text"
          placeholder="Enter city"
          onChange={(event) => setCity(event.target.value)}
        />
        <button onClick={handleFetchWeather}>Update Forecast</button>
      </div>
      <div className={weatherStyles.currentWeather}>
        {!isLoading && weatherData?.forecast ? (
          <>
            <div>
              <CurrentWeatherCard weatherData={weatherData} />
            </div>
            <div className={weatherStyles.cardContainer}>
              <UpcomingWeatherCard weatherData={weatherData} />
            </div>
          </>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <h2>No data found, please search another location</h2>
        )}
      </div>
    </div>
  );
}
