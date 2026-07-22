const express = require("express");
const router = express.Router();
const getContacts = require("../controllers/contacts");

router.get("/", getContacts.getAll);

router.get("/:id", getContacts.getSingle);

router.post("/", getContacts.createContact);

router.put("/:id", getContacts.updateContact);

router.delete("/:id", getContacts.deleteContact);

module.exports = router;
