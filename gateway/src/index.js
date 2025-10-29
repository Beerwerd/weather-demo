const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const config = require("./config");

runGatewayServer();

async function runGatewayServer() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "weather", url: config.weatherGraphqlUrl },
        { name: "assistant", url: config.assistantGraphqlUrl },
      ],
    }),
  });

  const server = new ApolloServer({ gateway });

  try {
    await startStandaloneServer(server, {
      listen: { port: config.port },
    });
    console.log(`Gateway GraphQL server is running on port: ${config.port}`);
  } catch (error) {
    console.error("Error starting GraphQL Gateway server:", error);
    throw error;
  }
}
