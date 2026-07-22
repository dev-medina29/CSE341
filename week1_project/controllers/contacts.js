const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const getAll = async (req, res) => {
  // #swagger.tags=["Contacts"]
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("contacts").find({}).toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags=["Contacts"]
  try {
    const userid = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db
      .collection("contacts")
      .find({ _id: userid })
      .toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contact" });
  }
};
// const updateContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday,
//   };
//   const response = await mongodb
//     .getDatabase()
//     .collection("contacts")
//     .replaceOne({ _id: userId }, contact);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res
//       .status(500)
//       .json(response.error || "Some error occured while updating the user");
//   }
// };

const updateContact = async (req, res) => {
  // #swagger.tags=["Contacts"]
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .collection("contacts") //
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Contact updated successfully" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update contact", error: error.message });
  }
};

const createContact = async (req, res) => {
  // #swagger.tags=["Contacts"]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(200).json({ message: "Contact created successfully " });
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while creating the user");
  }
};

const deleteContact = async (req, res) => {
  // #swagger.tags=["Contacts"]
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("contacts")
    .deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user");
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
