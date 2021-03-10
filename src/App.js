import { useEffect, useState, useMemo } from 'react';
import './App.css';
import {getWeather, getForecast} from './adapters/openweathermap.adapter.js';
import Layout from './components/Layout/Layout.jsx';
import City from './components/City/City.jsx';
import degToCardinalDir from './helpers/degToCardinalDirection.js';
import React from 'react';

const getWeatherEarly = getWeather();

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [isForecastOpen, setForecastOpen] = useState(false);

  const weatherDataDisplay = useMemo(() => {
    const cardinalWindDir = weatherData.wind && degToCardinalDir(weatherData.wind.deg)
    const capitalizedDescrip = weatherData.weather && (s => s.substr(0, 1).toUpperCase() + s.substr(1))(weatherData.weather[0].description);

    const rightWeatherInfoBlock = (
        <>
          <span style={{display: 'block'}} key={1}>Feels Like: {weatherData.main && Math.round(weatherData.main.feels_like)}° C</span>
          <span style={{display: 'block'}} key={2}>Pressure: {weatherData.main && weatherData.main.pressure} hPa</span>
          <span style={{display: 'block'}} key={3}>Humidity: {weatherData.main && weatherData.main.humidity}%</span>
          <span style={{display: 'block'}} key={4}>Feels Like: {weatherData.wind && Math.round(weatherData.wind.speed)} km/h, {cardinalWindDir}</span>
        </>
    )

    return {capitalizedDescrip, rightWeatherInfoBlock};
  }, [weatherData]);

  const forecastDataDisplay = useMemo(() => {
    const forecastBoxItem = (day) => (
      <li key={day.dt}>
        <span>{new Date(day.dt * 1000).toLocaleDateString(undefined, {weekday: 'short'})}</span>
        <span>{Math.round(day.main.temp)}°</span>
        <span>{day.weather[0].description}</span>
      </li>
    )

    const forecastBox = (
      <>
        <h2>5 Day forecast</h2>
        <ul>
          {forecastData.map(forecastBoxItem)}
        </ul>
      </>
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
            <div>
              <h2>{weatherData.name}, {weatherDataDisplay.capitalizedDescrip}</h2>
              <img src={weatherData.weather && `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt=""/>
            </div>
            <div>
              <span>{weatherData.main && Math.round(weatherData.main.temp)}°</span>
              <div>
                {weatherDataDisplay.rightWeatherInfoBlock}
              </div>
            </div>
            <button onClick={openForecastHandler}>{isForecastOpen ? '-' : '+'}</button>
            {isForecastOpen && forecastDataDisplay.forecastBox}
        </City>
      </Layout>
    </div>
  );
}

export default App;
