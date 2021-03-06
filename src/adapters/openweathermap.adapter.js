import axios from 'axios';
import openweathermapConfig from '../config/openweathermap.json';

export const getWeather = async () => {
  const resp = await axios.get(
    `${openweathermapConfig.host}/weather?q=${openweathermapConfig.city}&appid=${openweathermapConfig.key}&units=metric`
  );
  return (({ name, weather, main, wind }) => ({ name, weather, main, wind }))(resp.data);
};

export const getForecast = async () => {
  const resp = await axios.get(
    `${openweathermapConfig.host}/forecast?q=${openweathermapConfig.city}&appid=${openweathermapConfig.key}&units=metric`
  );
  return resp.data.list.reduce(
    (acc, curr, i) =>
      (i + 1) % 8 === 0
        ? [...acc, (({ dt, weather, main, wind }) => ({ dt, weather, main, wind }))(curr)]
        : acc,
    []
  );
};
