// Defining Port
const PORT = process.env.PORT || 5000;
const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty", // Sets the target to 'pino-pretty',
      options: {
        translateTime: "HH:MM:ss Z", // Configures how timestamps are displayed
        ignore: "pid,hostname", // Formats the time in hours, minutes, seconds, and timezone.
      },
    },
  },
  // eslint-disable-next-line max-len
  production: true, // Uses the default Pino logger configuration (likely JSON output for production use
  test: false, // Disables logging for test environments.
};

// Holding the instance of the Fastify application returned by app.js file
const server = require("./app")({
  // Configuring the logger for the Fastify
  logger: envToLogger.development ?? true, // defaults to true if no entry matches in the map
});

// Start function to start the server
const start = async () => {
  try {
    await server.listen({ port: PORT });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

// Start the server
start();
