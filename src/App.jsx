import React, { useEffect, useState, useCallback } from 'react';
import './app.scss';
import { getWeather, getForecast } from './adapters/openweathermap.adapter';
import Layout from './components/Layout/Layout';
import City from './components/City/City';

const getWeatherEarly = getWeather();

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [isForecastOpen, setForecastOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const wD = await getWeatherEarly;
        setWeatherData(wD);
      } catch (err) {
        // eslint-disable-next-line
        console.error('Failed to fetch weather data.', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (isForecastOpen) {
      try {
        (async () => {
          const fD = await getForecast();
          setForecastData(fD);
        })();
      } catch (err) {
        // eslint-disable-next-line
        console.error('Failed to fetch forecast data.', err);
      }
    }
  }, [isForecastOpen]);

  const openForecastHandler = useCallback(() => setForecastOpen((prev) => !prev), []);

  return (
    <div className='App'>
      <Layout>
        {JSON.stringify(weatherData) === '{}' ? (
          <h1>Loading...</h1>
        ) : (
          <City
            isForecastOpen={isForecastOpen}
            weatherData={weatherData}
            forecastData={forecastData}
            openForecastHandler={openForecastHandler}
          />
        )}
      </Layout>
    </div>
  );
};

export default App;
