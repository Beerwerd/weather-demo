const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  ApolloServerPluginInlineTraceDisabled,
} = require("@apollo/server/plugin/disabled");
const gql = require("graphql-tag");
const { fetchWeather } = require("./open-meteo");
const { getWeatherCondition } = require("./utils");

const typeDefs = gql`
  type Query {
    weather(city: String!): WeatherResponse
  }

  type WeatherResponse {
    current: CurrentWeather!
    forecast: [ForecastDay!]!
  }

  type CurrentWeather {
    temperature: String!
    condition: String!
  }

  type ForecastDay {
    date: String!
    maxTemp: String!
    minTemp: String!
    condition: String!
  }
`;

const resolvers = {
  Query: {
    weather: async (_, { city }) => {
      try {
        const data = await fetchWeather(city, "3");

        return {
          current: {
            temperature: `${data.current_weather.temperature}°C`,
            condition: getWeatherCondition(data.current_weather.weathercode),
          },
          forecast: data.daily.time.map((date, index) => ({
            date,
            maxTemp: `${data.daily.temperature_2m_max?.[index]}°C`,
            minTemp: `${data.daily.temperature_2m_min?.[index]}°C`,
            condition: getWeatherCondition(data.daily.weather_code?.[index]),
          })),
        };
      } catch (error) {
        console.error("Error fetching weather:", error);
        throw new Error("Failed to fetch weather");
      }
    },
  },
};

async function createGraphQLServer(port) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginInlineTraceDisabled()],
  });

  await startStandaloneServer(server, {
    listen: { port },
  });
  console.log(`Weather GraphQL is running on port: ${port}`);
}

module.exports = { createGraphQLServer };
