const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("./config");

const packageDefinition = protoLoader.loadSync(config.protoPath);
const weatherProto = grpc.loadPackageDefinition(packageDefinition).weather;

const client = new weatherProto.WeatherService(
  config.weatherGrpcUrl,
  grpc.credentials.createInsecure()
);

const call = client.StreamWeather({ cities: config.cities });
call.on("data", (res) => console.log(res?.alert));
call.on("end", () => console.log("Stream closed"));
call.on("error", (error) => console.error("Stream error:", error));
