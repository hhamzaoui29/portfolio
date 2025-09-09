// routes/mainRoutes.js
const express = require("express");
const router = express.Router();

// Route Accueil
router.get("/", (req, res) => {
                                    res.render("index");
                                    // Rendu de la vue index.ejs pour la page d'accueil
                              });

module.exports = router;
