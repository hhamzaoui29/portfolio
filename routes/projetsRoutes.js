// routes/projetsRoutes.js
const express = require("express");
const router = express.Router();
const projetsController = require("../controllers/projetsController");

// ** ------------------ LES ROUTES GET ------------------------------- **//
// Liste tous les projets
router.get("/", projetsController.listProjects);

// Formulaire création
router.get("/create", projetsController.formCreateProject);

// Formulaire édition
router.get("/edit/:id", projetsController.formUpdateProject);

// Détail projet
router.get("/:id", projetsController.showProject);

// ** ------------------ LES ROUTES POST ------------------------------- **//
// Créer un projet
router.post("/create", projetsController.createProject);

// Mettre à jour
router.post("/edit/:id", projetsController.updateProject);

// Supprimer
router.post("/delete/:id", projetsController.deleteProject);



module.exports = router;