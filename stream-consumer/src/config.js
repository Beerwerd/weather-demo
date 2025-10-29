const path = require("path");
require("dotenv").config({ quiet: true });

const config = {
  cities: ["Kyiv", "Dubai"],

  weatherGrpcUrl: `${process.env.WEATHER_HOST || "localhost"}:${
    process.env.WEATHER_GRPC_PORT || 50051
  }`,
  protoPath:
    process.env.WEATHER_PROTO_PATH ||
    path.resolve(__dirname, "../../../proto/weather.proto"),
};

module.exports = config;
