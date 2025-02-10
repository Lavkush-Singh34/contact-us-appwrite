// import { Client, Databases } from "appwrite";
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import "dotenv/config";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("public")); // Serve static files

// // Get __dirname in ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Appwrite Setup
// const client = new Client()
//   .setEndpoint(process.env.APPWRITE_ENDPOINT)
//   .setProject(process.env.APPWRITE_PROJECT_ID);

// const database = new Databases(client);

// // 📌 Serve Contact Page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "contact.html"));
// });

// // 📌 Serve Admin Page
// app.get("/admin", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "admin.html"));
// });

// // 📌 Handle Contact Form Submission
// app.post("/submit", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const response = await database.createDocument(
//       process.env.APPWRITE_DATABASE_ID,
//       process.env.APPWRITE_COLLECTION_ID,
//       "unique()", // Unique document ID
//       { name, email, message }
//     );

//     res.json({ success: true, data: response });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // 📌 Get All Messages (Admin)
// app.get("/messages", async (req, res) => {
//   try {
//     const response = await database.listDocuments(
//       process.env.APPWRITE_DATABASE_ID,
//       process.env.APPWRITE_COLLECTION_ID
//     );
//     res.json({ success: true, data: response.documents });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Start Server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Modify the Express API to handle DELETE requests.


// import express from "express";
// import cors from "cors";
// import { Client, Databases } from "appwrite";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const client = new Client()
//     .setEndpoint(process.env.APPWRITE_ENDPOINT)
//     .setProject(process.env.APPWRITE_PROJECT_ID);

// const database = new Databases(client);

// app.get("/messages", async (req, res) => {
//     try {
//         const response = await database.listDocuments(
//             process.env.APPWRITE_DATABASE_ID,
//             process.env.APPWRITE_COLLECTION_ID
//         );
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.delete("/messages/:id", async (req, res) => {
//     try {
//         await database.deleteDocument(
//             process.env.APPWRITE_DATABASE_ID,
//             process.env.APPWRITE_COLLECTION_ID,
//             req.params.id
//         );
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(3000, () => console.log("Server running on http://localhost:3000"));



// Solution 1️⃣: Serve Static Files (Recommended)
// Modify your index.js to serve the public folder:

// import express from "express";
// import cors from "cors";
// import { Client, Databases } from "appwrite";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public")));

// const client = new Client()
//     .setEndpoint(process.env.APPWRITE_ENDPOINT)
//     .setProject(process.env.APPWRITE_PROJECT_ID);

// const database = new Databases(client);

// // Fetch messages from Appwrite
// app.get("/messages", async (req, res) => {
//     try {
//         const response = await database.listDocuments(
//             process.env.APPWRITE_DATABASE_ID,
//             process.env.APPWRITE_COLLECTION_ID
//         );
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete a message
// app.delete("/messages/:id", async (req, res) => {
//     try {
//         await database.deleteDocument(
//             process.env.APPWRITE_DATABASE_ID,
//             process.env.APPWRITE_COLLECTION_ID,
//             req.params.id
//         );
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Redirect `/` to contact.html
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "contact.html"));
// });

// app.listen(3000, () => console.log("Server running on http://localhost:3000"));





// ✅ Fix: Serve Static Files Properly
// Modify index.js to serve the public folder correctly:

// import express from "express";
// import cors from "cors";
// import { Client, Databases } from "appwrite";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public"))); // Serve the 'public' folder

// const client = new Client()
//     .setEndpoint(process.env.APPWRITE_ENDPOINT)
//     .setProject(process.env.APPWRITE_PROJECT_ID);

// const database = new Databases(client);

// // Fetch messages from Appwrite
// app.get("/messages", async (req, res) => {
//     try {
//         const response = await database.listDocuments(
//             process.env.APPWRITE_DATABASE_ID,
//             process.env.APPWRITE_COLLECTION_ID
//         );
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete a message
// app.delete("/messages/:id", async (req, res) => {
//     try {
//         await database.deleteDocument(
//             process.env.APPWRITE_DATABASE_ID,
//             process.env.APPWRITE_COLLECTION_ID,
//             req.params.id
//         );
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route for Contact Page
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "contact.html"));
// });

// // Route for Admin Page
// app.get("/admin", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "admin.html"));
// });

// // Start the server
// app.listen(3000, () => console.log("Server running on http://localhost:3000"));





import express from "express";
import cors from "cors";
import { Client, Databases, ID } from "appwrite";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

const database = new Databases(client);

// ✅ Handle form submission
app.post("/submit", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const response = await database.createDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_ID,
            ID.unique(),
            { name, email, message }
        );
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch messages from Appwrite
app.get("/messages", async (req, res) => {
    try {
        const response = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_ID
        );
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a message
app.delete("/messages/:id", async (req, res) => {
    try {
        await database.deleteDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_ID,
            req.params.id
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for Contact Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Route for Admin Page
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
