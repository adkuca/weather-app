import React, { useEffect, useState, useCallback } from 'react';
import './app.scss';
import { getWeather, getForecast } from './adapters/openweathermap.adapter.js';
import Layout from './components/Layout/Layout.jsx';
import City from './components/City/City.jsx';

const getWeatherEarly = getWeather();

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [isForecastOpen, setForecastOpen] = useState(false);

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

  const openForecastHandler = useCallback(() => setForecastOpen(prev => !prev), []);

  return (
    <div className="App">
      <Layout>
        {JSON.stringify(weatherData) === '{}' ? <h1>Loading...</h1> : 
        <City isForecastOpen={isForecastOpen} weatherData={weatherData} forecastData={forecastData} openForecastHandler={openForecastHandler} />}
      </Layout>
    </div>
  );
}

export default App;
