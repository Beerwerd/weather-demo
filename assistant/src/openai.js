const OpenAI = require("openai");
const { fallbackBriefing } = require("./mock");
const config = require("./config");

const openaiClient = config.openAIKey
  ? new OpenAI({
      apiKey: config.openAIKey,
    })
  : null;

async function tripBriefing(forecast) {
  return openaiClient
    ? tripBriefingOpenAI(forecast)
    : Promise.resolve(fallbackBriefing(forecast));
}

async function tripBriefingOpenAI(forecast) {
  const forecastSummary = forecast
    .map(({ maxTemp, minTemp, condition }) => {
      return `${minTemp} - ${maxTemp}, ${condition}`;
    })
    .join("\n");

  const prompt = `Create a trip briefing for the following forecast:
    ${forecastSummary}
    Respond with JSON containing:
    - "pack": array of 3-5 short, essential packing item names based on the weather
    - "tips": array of 2-3 practical weather-related travel tips
    Example format:
    {"pack": ["Rain jacket", "Warm layers"], "tips": ["Check weather updates", "Plan indoor alternatives"]}`;

  const response = await openaiClient.chat.completions.create({
    model: config.openAIModel,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  const briefing = response?.choices?.[0]?.message?.content?.trim();
  if (!briefing) {
    throw new Error("OpenAI did not return any content for the briefing.");
  }

  try {
    return JSON.parse(briefing);
  } catch (error) {
    throw new Error("OpenAI returned invalid JSON for the briefing.");
  }
}

module.exports = {
  tripBriefing,
};
