require("dotenv").config({ quiet: true });
const path = require("path");

const config = {
  graphqlPort: process.env.ASSISTANT_PORT || 4002,
  weatherGrpcUrl: `${process.env.WEATHER_HOST || "localhost"}:${
    process.env.WEATHER_GRPC_PORT || 50051
  }`,

  openAIKey: process.env.OPENAI_API_KEY,
  openAIModel: process.env.OPENAI_API_MODEL || "gpt-5-mini",

  protoPath:
    process.env.WEATHER_PROTO_PATH ||
    path.resolve(__dirname, "../../../proto/weather.proto"),
};

module.exports = config;
