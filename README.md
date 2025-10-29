# Weather Demo Application

A GraphQL-based weather application that provides weather forecasts and travel packing tips for cities.
This application uses gRPC for communication between its microservices.

## Quick Start

1. Copy the environment configuration:

   ```bash
   cp .env.example .env
   ```

2. Start the application:
   ```bash
   docker-compose up
   ```

The application will run with mocked weather data and mocked assistance tips. The GraphQL endpoint will be available at `http://localhost:4000`.

The stream-consumer server will output console updates for specific cities to demonstrate gRPC streaming functionality.

## GraphQL API

The API provides two main queries:

### Query Weather Only

```graphql
query Weather($city: String!) {
  weather(city: $city) {
    current {
      temperature
      condition
    }
    forecast {
      date
      maxTemp
      minTemp
      condition
    }
  }
}
```

### Query Trip Briefing Only

```graphql
query TripBriefing($city: String!) {
  tripBriefing(city: $city) {
    pack
    tips
  }
}
```

### Query Both Weather and Trip Briefing

```graphql
query Weather($city: String!) {
  tripBriefing(city: $city) {
    pack
    tips
  }
  weather(city: $city) {
    current {
      temperature
      condition
    }
    forecast {
      date
      maxTemp
      minTemp
      condition
    }
  }
}
```

## Configuration Options

### Enable Real Weather Data

To use real weather data from Open-Meteo API, uncomment the following line in your `.env` file:

```
USE_OPEN_METEO=true
```

### Enable OpenAI Integration

To get real packing recommendations and tips powered by OpenAI, add your API key to the `.env` file:

```
OPENAI_API_KEY=your_openai_api_key_here
```

You can also customize the OpenAI model by setting the `OPENAI_API_MODEL` environment variable (defaults to `gpt-5-mini`):

```
OPENAI_API_MODEL=gpt-5
```

## What else should be done to make an app better

To make this weather app production-ready, several improvements should be implemented:

### Code Quality & Testing

- **Unit Tests** - Test individual functions and components
- **Integration Tests** - Test API endpoints and data flow
- **End-to-End Tests** - Test complete user workflows
- **Linter + Prettier** - Enforce consistent code style and catch errors
- **Type Safety** - Use TypeScript for better type checking
- **Code Coverage** - Ensure adequate test coverage

### Error Handling & Validation

- **Input Validation** - Validate and sanitize all incoming parameters
- **API Error Handling** - Gracefully handle external API failures
- **Rate Limiting** - Prevent API abuse and respect third-party limits
- **Timeout Handling** - Handle slow or unresponsive external services
- **Fallback Mechanisms** - Use mock data when APIs fail

### Security & Performance

- **CORS Configuration** - Proper cross-origin request handling
- **Caching Strategy** - Implement Redis/memory caching for API responses

### Monitoring & Operations

- **Logger** - Integrate winston to better log output
- **Health Checks** - Endpoint to verify service availability
