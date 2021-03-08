import axios from 'axios';
import openweathermapConfig from '../config/openweathermap.json';
const getWeather = () => axios.get(`${openweathermapConfig.host}/weather?q=${openweathermapConfig.city}&appid=${openweathermapConfig.key}`);
const getForecast = () => axios.get(`${openweathermapConfig.host}/forecast?q=${openweathermapConfig.city}&appid=${openweathermapConfig.key}`);
export {getWeather, getForecast}; 