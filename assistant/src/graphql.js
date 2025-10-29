const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  ApolloServerPluginInlineTraceDisabled,
} = require("@apollo/server/plugin/disabled");
const gql = require("graphql-tag");
const { tripBriefing } = require("./openai");
const { WeatherClient } = require("./grpc");

const typeDefs = gql`
  type Query {
    tripBriefing(city: String!): TripBriefingResponse
  }

  type TripBriefingResponse {
    pack: [String!]!
    tips: [String!]!
  }
`;

const resolvers = ({ weatherClient }) => ({
  Query: {
    tripBriefing: async (_, { city }) => {
      try {
        const forecast = await weatherClient.getForecast(city);

        return tripBriefing(forecast);
      } catch (error) {
        console.error("Error fetching forecast:", error);
        throw new Error("Failed to fetch weather forecast");
      }
    },
  },
});

async function createGraphQLServer(port) {
  const weatherClient = new WeatherClient();

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers: resolvers({ weatherClient }),
    }),
    plugins: [ApolloServerPluginInlineTraceDisabled()],
  });

  await startStandaloneServer(server, {
    listen: { port },
  });
  console.log(`Assistant GraphQL server is running on port: ${port}`);

  return server;
}

module.exports = { createGraphQLServer };
