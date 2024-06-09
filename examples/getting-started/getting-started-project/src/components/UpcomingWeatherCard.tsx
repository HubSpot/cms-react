import dayjs from 'dayjs';
import weatherStyles from '../styles/weather.module.css';
import { getWeatherIcon } from '../utils.ts';

export function UpcomingWeatherCard({ weatherData }: any) {
  return (
    <div className={weatherStyles.card}>
      <span>{dayjs(weatherData.date).format('dddd')}</span>
      <img
        src={getWeatherIcon(weatherData.day.condition.text.trim())}
        alt={weatherData.day.condition.text}
      />
      <h3>
        {weatherData.day.avgtemp_f}&deg;
        <span className={weatherStyles.unit}>F</span>
      </h3>
    </div>
  );
}
