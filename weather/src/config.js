const config = {
  grpcPort: process.env.WEATHER_GRPC_PORT || 50051,
  graphqlPort: process.env.WEATHER_PORT || 4001,
  useOpenMeteo: process.env.USE_OPEN_METEO === "true",
  protoPath:
    process.env.WEATHER_PROTO_PATH ||
    path.resolve(__dirname, "../../../proto/weather.proto"),

  streamDelay: 10 * 1000, // 10 seconds
};

module.exports = config;
