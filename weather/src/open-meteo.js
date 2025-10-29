const { OPEN_METEO_URL, COORDINATES } = require("./constants");
const { randomWeather } = require("./mock");
const config = require("./config");

async function fetchWeather(city, forecast_days = "0", date_from) {
  return config.useOpenMeteo
    ? fetchOpenMeteo(city, forecast_days, date_from)
    : Promise.resolve(randomWeather(city, forecast_days));
}

async function fetchOpenMeteo(city, forecast_days = "0", date_from) {
  const [latitude, longitude] =
    COORDINATES[city.toLowerCase()] ?? COORDINATES["kyiv"];
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current_weather: "true",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      timezone: "auto",
      forecast_days,
    });

    // Add date range if provided
    if (date_from) {
      params.set("start_date", date_from);
    }

    const url = `${OPEN_METEO_URL}?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

module.exports = {
  fetchWeather,
};
