import { useEffect, useState, useMemo } from 'react';
import './app.scss';
import {getWeather, getForecast} from './adapters/openweathermap.adapter.js';
import Layout from './components/Layout/Layout.jsx';
import City from './components/City/City.jsx';
import degToCardinalDir from './helpers/degToCardinalDirection.js';

const getWeatherEarly = getWeather();

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [isForecastOpen, setForecastOpen] = useState(false);

  const weatherDataDisplay = useMemo(() => {
    const cardinalWindDir = weatherData.wind && degToCardinalDir(weatherData.wind.deg)
    const capitalizedDescrip = weatherData.weather && (s => s.substr(0, 1).toUpperCase() + s.substr(1))(weatherData.weather[0].description);

    const rightWeatherInfoBlock = (
        <ul className="main-info__list">
          <li key={1} className="main-info__item">Feels Like: {weatherData.main && Math.round(weatherData.main.feels_like)}° C</li>
          <li key={2} className="main-info__item">Pressure: {weatherData.main && weatherData.main.pressure} hPa</li>
          <li key={3} className="main-info__item">Humidity: {weatherData.main && weatherData.main.humidity}%</li>
          <li key={4} className="main-info__item">Feels Like: {weatherData.wind && Math.round(weatherData.wind.speed)} km/h, {cardinalWindDir}</li>
        </ul>
    )

    return {capitalizedDescrip, rightWeatherInfoBlock};
  }, [weatherData]);

  const forecastDataDisplay = useMemo(() => {
    const forecastBoxItem = (day) => {
      const capitalizedWeatherDescrip = (s => s.substr(0, 1).toUpperCase() + s.substr(1))(day.weather[0].description);
      return (
        <li key={day.dt} className="forecast-box__item">
          <span className="forecast-box__weekday">{new Date(day.dt * 1000).toLocaleDateString(undefined, {weekday: 'short'})}</span>
          <span className="forecast-box__temp">{Math.round(day.main.temp)}°</span>
          <span className="forecast-box__description">{capitalizedWeatherDescrip}</span>
        </li>
      )
    }

    const forecastBox = (
      <div className="forecast-box">
        <h2 className="forecast-box__title">5 Day forecast</h2>
        <ul className="forecast-box__list">
          {forecastData.map(forecastBoxItem)}
        </ul>
      </div>
    )

    return {forecastBox}
  }, [forecastData])

  useEffect(() => {
    (async () => {
      try {
        const weatherData = await getWeatherEarly;
        setWeatherData(weatherData);
      } catch(err) {
        console.error('Failed to fetch weather data.', err);
      }
    })()
  }, []);

  useEffect(() => {
    if (isForecastOpen) {
      try {
        (async () => {
          const forecastData = await getForecast();
          setForecastData(forecastData);
        })();
      } catch(err) {
        console.error('Failed to fetch forecast data.', err);
      }
    }
  }, [isForecastOpen]);

  const openForecastHandler = () => setForecastOpen(prev => !prev);

  return (
    JSON.stringify(weatherData) === '{}' ? <h1>Loading...</h1> :
    <div className="App">
      <Layout>
        <City>
          <div className="container">
            <div className="">
              <div className="heading">
                <h2 className="heading__city">{weatherData.name}, {weatherDataDisplay.capitalizedDescrip}</h2>
                <div className="heading__img-wrapper">
                  <img className="heading__img" src={weatherData.weather && `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt=""/>
                </div>
              </div>
              <div className="main-info">
                <h3 className="main-info__temp">{weatherData.main && Math.round(weatherData.main.temp)}°</h3>
                {weatherDataDisplay.rightWeatherInfoBlock}
              </div>
            </div>
            <button className="open-forecast-btn" onClick={openForecastHandler}>{isForecastOpen ? '-' : '+'}</button>
            {isForecastOpen && forecastDataDisplay.forecastBox}
          </div>
        </City>
      </Layout>
    </div>
  );
}

export default App;
