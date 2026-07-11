const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("contact").find({}).toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

const getSingle = async (req, res) => {
  try {
    const userid = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db
      .collection("contact")
      .find({ _id: userid })
      .toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contact" });
  }
};

module.exports = { getAll, getSingle };
