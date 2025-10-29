const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { WMO_HINTS, WMO_CONDITIONS } = require("./constants");
const { fetchWeather } = require("./open-meteo");
const { getWeatherCondition } = require("./utils");
const config = require("./config");

const packageDefinition = protoLoader.loadSync(config.protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const weatherProto = grpc.loadPackageDefinition(packageDefinition).weather;

function streamWeather(call) {
  const cities = call.request.cities;

  const interval = setInterval(() => {
    cities.forEach(async (city) => {
      const data = await fetchWeather(city);
      const wmoCode = data.current_weather?.weathercode;

      const alert = `${WMO_CONDITIONS[wmoCode]} in ${city} - ${WMO_HINTS[wmoCode]}`;

      call.write({ alert });
    });
  }, config.streamDelay);

  call.on("cancelled", () => {
    clearInterval(interval);
  });
}

function getForecast(call, callback) {
  const { city, date_from, date_to } = call.request;

  let forecast_days = 3;

  // set forecast_days based on date range, max 7 days
  if (date_from && date_to) {
    const fromDate = new Date(date_from);
    const toDate = new Date(date_to);
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    forecast_days = Math.min(diffDays, 7);
  }

  fetchWeather(city, forecast_days, date_from)
    .then((data) => {
      const forecast = data.daily.time.map((date, index) => ({
        date,
        max_temp: `${data.daily.temperature_2m_max?.[index]}°C` || "",
        min_temp: `${data.daily.temperature_2m_min?.[index]}°C` || "",
        condition: getWeatherCondition(data.daily.weather_code?.[index]),
      }));

      callback(null, { forecast });
    })
    .catch((error) => {
      callback({
        code: grpc.status.INTERNAL,
        details: error.message,
      });
    });
}

function createGRPCServer(port) {
  const server = new grpc.Server();
  server.addService(weatherProto.WeatherService.service, {
    StreamWeather: streamWeather,
    GetForecast: getForecast,
  });

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`Weather gRPC is running on port: ${port}`);
    }
  );
}

module.exports = { createGRPCServer };
