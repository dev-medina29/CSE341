require("dotenv").config();

const { MongoClient } = require("mongodb");

async function getContacts(req, res) {
  let url;

  try {
    url = process.env.MONGODB_URL;

    if (!url) {
      return res.status(500).json({
        message:
          "MONGODB_URL is not configured. Create a .env file or set the environment variable.",
      });
    }

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("mmbedi_db_user");
    const collection = db.collection("contact");
    const results = await collection.find({}).toArray();
    await client.close();
    return res.json(results);
  } catch (error) {
    console.error("MongoDB connection error:", error);

    const message =
      error.code === "ECONNREFUSED" || error.code === "ENOTFOUND"
        ? url?.startsWith("mongodb+srv://")
          ? "Failed to connect to MongoDB Atlas SRV host. Check MONGODB_URL, network access, and DNS/SRV support. Use a standard mongodb:// URI if SRV is blocked."
          : "Failed to connect to MongoDB. Check MONGODB_URL and network access."
        : "Failed to fetch contacts";

    return res.status(500).json({
      message,
      error: error.code || error.name,
    });
  }
}

module.exports = getContacts;
