const { createGraphQLServer } = require("./graphql");
const config = require("./config");

async function main() {
  console.log(
    `Assistant: using ${config.openAIKey ? "OpenAI API" : "Mock Data"}`
  );

  createGraphQLServer(config.graphqlPort);
}

main().catch(console.error);
