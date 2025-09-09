
const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Formulaire contact
router.get("/", contactController.formContact);

// Envoi du message
router.post("/", contactController.sendMessage);

module.exports = router;
