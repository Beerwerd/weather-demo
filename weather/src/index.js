const { createGRPCServer } = require("./grpc");
const { createGraphQLServer } = require("./graphql");
const config = require("./config");

let grpcServer;
let graphqlServer;

async function main() {
  console.log(
    `Weather using ${config.useOpenMeteo ? "Open-Meteo" : "Mock Data"}`
  );

  try {
    grpcServer = createGRPCServer(config.grpcPort);
    graphqlServer = await createGraphQLServer(config.graphqlPort);
  } catch (error) {
    console.error("Failed to start weather service", error);
    process.exit(1);
  }
}

main();
