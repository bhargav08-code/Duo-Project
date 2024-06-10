import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
  // Attempt to connect to the database using the URL from the environment variables
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB CONNECTED")) // Log success message if connected
    .catch((error) => console.error("DB CONNECTION FAILED: ", error)); // Log error message if connection fails
};
