import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { connectDB } from "./config/db.js";

// App configuration
const app = express();

// Middleware
app.use(express.json()); // Allows the app to parse JSON bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing
//DB connection

connectDB();
// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Backend Working"); // Responds with a message indicating the backend is working
});

// Start the server and listen on the port specified in the .env file
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`); // Logs a message indicating the server is running
});
