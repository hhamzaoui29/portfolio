const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

// Routes spécifiques en PREMIER
router.get("/", notesController.listNotes); // Liste des notes
router.get("/formCreateNote", notesController.formCreateNote); // Formulaire création
router.get("/formUpdateNote/:id", notesController.formUpdateNote); // Formulaire édition

// Route paramétrée en DERNIER
router.get("/showNote/:id", notesController.formShowNote); // Afficher une note

// Routes POST
router.post("/createNote", notesController.renderCreateNote);
router.post("/updateNote/:id", notesController.renderUpdateNote);
router.post("/deleteNote/:id", notesController.deleteNote);

module.exports = router;
