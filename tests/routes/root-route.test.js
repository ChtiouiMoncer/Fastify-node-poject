// Import the application builder function from the Fastify app module.
const build = require("../../src/app");

// Declare a variable to hold the Fastify app instance.
let app;

// Group related tests together in a describe block. 
// This block contains tests related to the "Root route".
describe("Root route", () => {

  // Before each test in this describe block, initialize the Fastify app.
  // This ensures each test starts with a fresh instance of the app.
  beforeEach(() => {
    app = build();
  });

  // After each test, close the Fastify app.
  // This is important for cleanup and to prevent open handles.
  afterEach(() => {
    app.close();
  });

  // Define an individual test case.
  // This test checks the response from the root route of the application.
  it("should return 200 when root route called", async () => {
    // Use Fastify's 'inject' method to simulate an HTTP request to the root route.
    // The 'inject' method is a powerful tool for testing, as it mimics an HTTP request.
    const res = await app.inject({
      url: "/",
    });

    // Assert that the HTTP response status code is 200, indicating success.
    expect(res.statusCode).toBe(200);

    // Assert that the JSON response body is as expected.
    // Here, we expect the response to equal { hello: "world!" }.
    expect(res.json()).toEqual({ hello: "world!" });
  });
});