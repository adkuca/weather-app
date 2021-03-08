import { useEffect, useState } from 'react';
import './App.css';
import {getWeather, getForecast} from './adapters/openweathermap.adapter.js';
import Layout from './components/Layout.jsx'
import City from './components/City.jsx'

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [isForecastOpen, setForecastOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const weatherResp = await getWeather();
        const {name, weather, main, wind} = weatherResp.data;
        const wObj = {name, weather, main, wind};
        console.log(weatherResp.data);
        setWeatherData(prev => ({...prev, ...wObj}));
      } catch(err) {
        console.log('Failed to fetch weather data.', err);
      }
    })()
  }, []);

  useEffect(() => {
    if (isForecastOpen) {
      try {
        (async () => {
          const forecastResp = await getForecast();
          console.log(forecastResp.data.list);
          setForecastData(forecastResp.data.list);
          
        })();
      } catch(err) {
        console.log('Failed to fetch forecast data.', err);
      }
    }
  }, [isForecastOpen]);

  const openForecastHandler = () => setForecastOpen(prev => !prev);

  return (
    <div className="App">
      <Layout>
        <City>
            <p>{JSON.stringify(weatherData)}</p>
            <button onClick={openForecastHandler}>{isForecastOpen ? '-' : '+'}</button>
            {isForecastOpen ? <div>{forecastData.map(val => <li key={val.dt}>{JSON.stringify(val)}</li>)}</div> : null}
        </City>
      </Layout>
    </div>
  );
}

export default App;
