const { WMO_CONDITIONS } = require("./constants");

const randomWMOCode = () => {
  const codes = Object.keys(WMO_CONDITIONS);

  return codes[Math.floor(Math.random() * codes.length)];
};

const randomWeather = (_, forecast_days) => {
  const days = parseInt(forecast_days, 0);

  const daily = {
    time: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    weather_code: [],
  };
  Array.from({ length: days }).forEach(() => {
    daily.time.push(new Date().toISOString().split("T")[0]);
    daily.temperature_2m_max.push((Math.random() * 15 + 5).toFixed(1));
    daily.temperature_2m_min.push((Math.random() * 5).toFixed(1));
    daily.weather_code.push(randomWMOCode());
  });

  return {
    current_weather: {
      time: new Date().toISOString(),
      temperature: 7.2,
      weathercode: randomWMOCode(),
    },
    daily,
  };
};

module.exports = {
  randomWeather,
};
