const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

// Routes spécifiques en PREMIER
router.get("/", reservationsController.listReservations); // Liste des notes
router.get("/formCreateReservation", reservationsController.formCreateReservation); // Formulaire création
router.get("/formUpdateReservation/:id", reservationsController.formUpdateReservation); // Formulaire édition

// Route paramétrée en DERNIER
router.get("/showReservation/:id", reservationsController.formShowReservation); // Afficher une note

// Routes POST
router.post("/createReservation", reservationsController.renderCreateReservation);
router.post("/updateReservation/:id", reservationsController.renderUpdateReservation);
router.post("/deleteReservation/:id", reservationsController.deleteReservation);

module.exports = router;
