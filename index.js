// Import the 'express' module for creating the web server
import express from "express";

// Import the 'cors' module for enabling Cross-Origin Resource Sharing (CORS) middleware
import cors from "cors";

// Import the 'http' module for creating an HTTP server
import http from "http";

// Import the 'socketSetup' function from the './socket.js' file to set up WebSocket connections
import socketSetup from "./socket.js";

try {
  // Create an Express application instance
  const app = express();

  // Create an HTTP server using the Express application
  const server = http.createServer(app);

  // Enable CORS middleware to allow cross-origin requests
  app.use(cors());

  // Parse incoming request bodies as JSON
  app.use(express.json());

  // Set up WebSocket connections by calling the 'socketSetup' function with the created server
  socketSetup(server);

  // Define the port number on which the server will listen for incoming requests
  const PORT = process.env.PORT || 3002;

  // Start the server and make it listen on the specified port
  server.listen(PORT, () => {
    // Log a message indicating that the server is running and listening on the specified port
    console.log(`Server Running on Port ${PORT}...`);
  });
} catch (error) {
  // Handle any errors that occur during initialization
  console.error("An error occurred during server initialization:", error);
}
