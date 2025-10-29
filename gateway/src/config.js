require("dotenv").config({ quiet: true });

const config = {
  port: process.env.GATEWAY_PORT || 4000,
  weatherGraphqlUrl: `http://${process.env.WEATHER_HOST || "localhost"}:${
    process.env.WEATHER_PORT || 4001
  }`,
  assistantGraphqlUrl: `http://${process.env.ASSISTANT_HOST || "localhost"}:${
    process.env.ASSISTANT_PORT || 4002
  }`,
};

module.exports = config;
