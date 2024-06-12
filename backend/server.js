import express from "express";
import cors from "cors";
import "dotenv/config.js";
import multer from "multer";
import { connectDB } from "./config/db.js";
import { UploadMedia } from "./config/cloud-config.js";
// App configuration
const app = express();

// Middleware
app.use(express.json()); // Allows the app to parse JSON bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing
//DB connection

connectDB();
// Define a route for the root URL

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Define an endpoint to handle file upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const localFilePath = req.file.path;

    // Upload the file to Cloudinary
    const cloudinaryResponse = await UploadMedia(localFilePath);

    if (cloudinaryResponse) {
      res.status(200).send({
        message: "File uploaded successfully",
        url: cloudinaryResponse.url,
      });
    } else {
      res.status(500).send({ message: "File upload failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});
app.get("/", (req, res) => {
  res.send("Backend Working"); // Responds with a message indicating the backend is working
});

// Start the server and listen on the port specified in the .env file
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`); // Logs a message indicating the server is running
});
