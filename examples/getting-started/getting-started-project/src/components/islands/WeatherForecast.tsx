import { useEffect, useState } from 'react';
import weatherStyles from '../../styles/weather.module.css';
import { getWeatherForecast } from '../../utils.ts';
import { UpcomingWeatherCard } from '../UpcomingWeatherCard.tsx';
import { CurrentWeatherCard } from '../CurrentWeatherCard.tsx';
import { WeatherData } from '../../types.ts';

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
        <h2>No data available for {city || 'this area'}</h2>
      )}
    </div>
  );
}
