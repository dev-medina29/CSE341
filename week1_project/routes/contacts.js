const express = require("express");
const router = express.Router();
const getContacts = require("../controllers/contacts");

router.get("/", getContacts.getAll);
router.get("/:id", getContacts.getSingle);

module.exports = router;
