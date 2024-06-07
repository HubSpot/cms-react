import { logInfo } from '@hubspot/cms-components';
import weatherStyles from '../styles/weather.module.css';
import { getWeatherIcon } from '../utils.ts';

export function UpcomingWeatherCard({ weather }) {
  logInfo(weather.day.condition.text);
  return (
    <div className={weatherStyles.card}>
      <sup>{weather.date}</sup>
      <img
        src={getWeatherIcon(weather.day.condition.text.trim())}
        alt={weather.day.condition.text}
      />
      <h3>
        {weather.day.avgtemp_f}&deg;
        <span className={weatherStyles.unit}>F</span>
      </h3>
    </div>
  );
}
