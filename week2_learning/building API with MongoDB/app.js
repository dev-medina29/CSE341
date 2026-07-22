require("dotenv").config();
const Express = require("express");
const BodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const CONNECTION_URL = process.env.MONGODB_URL;
const DATABASE_NAME = "mmbedi_db_user";

let database, collection;

// POST route
app.post("/personnel", async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/personnel", (request, response) => {
  collection = database.collection("contact");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});
// Connect to DB and start server
app.listen(5000, async () => {
  try {
    const client = await MongoClient.connect(CONNECTION_URL);
    database = client.db(DATABASE_NAME);
    collection = database.collection("contact");
    // console.log(collection)
    // Example query to show data in console
    const docs = await collection.find({}).toArray();
    console.log("Existing contacts:", docs);

    console.log("Connected to `" + DATABASE_NAME + "`!");
  } catch (error) {
    console.error(error);
  }
});
