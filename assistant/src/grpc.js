const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("./config");

const packageDefinition = protoLoader.loadSync(config.protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const weatherProto = grpc.loadPackageDefinition(packageDefinition).weather;

class WeatherClient {
  constructor(serverAddress = config.weatherGrpcUrl) {
    this.client = new weatherProto.WeatherService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  getForecast(city, dateFrom, dateTo) {
    return new Promise((resolve, reject) => {
      const request = {
        city,
        date_from: dateFrom,
        date_to: dateTo,
      };

      this.client.GetForecast(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.forecast);
        }
      });
    });
  }

  streamWeather(cities) {
    const request = { cities };
    return this.client.StreamWeather(request);
  }

  close() {
    this.client.close();
  }
}

module.exports = { WeatherClient };
