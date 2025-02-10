import { Client, Databases } from "appwrite";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Appwrite Setup
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);

const database = new Databases(client);

// 📌 Serve Contact Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// 📌 Serve Admin Page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// 📌 Handle Contact Form Submission
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const response = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      "unique()", // Unique document ID
      { name, email, message }
    );

    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 📌 Get All Messages (Admin)
app.get("/messages", async (req, res) => {
  try {
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID
    );
    res.json({ success: true, data: response.documents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
