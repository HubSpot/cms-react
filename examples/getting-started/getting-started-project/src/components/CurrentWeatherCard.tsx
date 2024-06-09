import weatherStyles from '../styles/weather.module.css';
import { getWeatherIcon } from '../utils.ts';

export function CurrentWeatherCard({ weatherData }: any) {
  const { location, forecast } = weatherData;
  const { forecastday } = forecast;
  const currentDay = forecastday[0].day;

  return (
    <div className={weatherStyles.current}>
      <div className={weatherStyles.condition}>
        <img
          src={getWeatherIcon(currentDay.condition.text.trim())}
          alt={currentDay.condition.text}
        />
        <h3>
          {currentDay.avgtemp_f}&deg;
          <span className={weatherStyles.unit}>F</span>
        </h3>
      </div>
      <h2 className={weatherStyles.city}>{location.name}</h2>
      <span className={weatherStyles.country}>{location.country}</span>
    </div>
  );
}
