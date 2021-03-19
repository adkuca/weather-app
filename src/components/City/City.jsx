import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './city.scss';
import degToCardinalDir from './helpers/degToCardinalDirection';

const City = ({ isForecastOpen, weatherData, forecastData, openForecastHandler }) => {
  const weatherDataDisplay = useMemo(() => {
    const cardinalWindDir = weatherData.wind && degToCardinalDir(weatherData.wind.deg);
    const capitalizedDescrip =
      weatherData.weather &&
      ((s) => s.substr(0, 1).toUpperCase() + s.substr(1))(weatherData.weather[0].description);

    const rightWeatherInfoBlock = (
      <ul className='main-info__list'>
        <li key={1} className='main-info__item'>
          Feels Like: {weatherData.main && Math.round(weatherData.main.feels_like)}° C
        </li>
        <li key={2} className='main-info__item'>
          Pressure: {weatherData.main && weatherData.main.pressure} hPa
        </li>
        <li key={3} className='main-info__item'>
          Humidity: {weatherData.main && weatherData.main.humidity}%
        </li>
        <li key={4} className='main-info__item'>
          Wind: {weatherData.wind && Math.round(weatherData.wind.speed)} km/h, {cardinalWindDir}
        </li>
      </ul>
    );

    return { capitalizedDescrip, rightWeatherInfoBlock };
  }, [weatherData]);

  const forecastDataDisplay = useMemo(() => {
    const forecastBoxItem = (day) => {
      const capitalizedWeatherDescrip = ((s) => s.substr(0, 1).toUpperCase() + s.substr(1))(
        day.weather[0].description
      );
      return (
        <li key={day.dt} className='forecast-box__item'>
          <span className='forecast-box__weekday'>
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: 'short',
            })}
          </span>
          <span className='forecast-box__temp'>{Math.round(day.main.temp)}°</span>
          <span className='forecast-box__description'>{capitalizedWeatherDescrip}</span>
        </li>
      );
    };

    const forecastBox = (
      <div className='forecast-box'>
        <h2 className='forecast-box__title'>5 Day forecast</h2>
        <ul className='forecast-box__list'>{forecastData.map(forecastBoxItem)}</ul>
      </div>
    );

    return { forecastBox };
  }, [forecastData]);

  return (
    <div className='container'>
      <div className='heading'>
        <h2 className='heading__city'>
          {weatherData.name}, {weatherDataDisplay.capitalizedDescrip}
        </h2>
        <div className='heading__img-wrapper'>
          <img
            className='heading__img'
            src={
              weatherData.weather &&
              `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
            }
            alt=''
          />
        </div>
      </div>
      <div className='main-info'>
        <h3 className='main-info__temp'>
          {weatherData.main && Math.round(weatherData.main.temp)}°
        </h3>
        {weatherDataDisplay.rightWeatherInfoBlock}
      </div>
      <button className='open-forecast-btn' onClick={openForecastHandler} type='button'>
        {isForecastOpen ? '-' : '+'}
      </button>
      {isForecastOpen && forecastDataDisplay.forecastBox}
    </div>
  );
};

export default React.memo(City);

City.propTypes = {
  isForecastOpen: PropTypes.bool.isRequired,
  weatherData: PropTypes.PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      name: PropTypes.number,
      temp: PropTypes.number,
      feels_like: PropTypes.number,
      pressure: PropTypes.number,
      humidity: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number,
    }),
  }).isRequired,
  forecastData: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number,
      }),
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  openForecastHandler: PropTypes.func.isRequired,
};
