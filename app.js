const express = require("express");
const path = require ("path");
const bodyParser = require("body-parser");

// Import des routes
const mainRoutes = require("./routes/mainRoutes");
const projetsRoutes = require("./routes/projetsRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require('./routes/messageRoutes');
const notesRoutes = require("./routes/notesRoutes");
const reservationsRoutes = require("./routes/reservationsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middlewares
app.use(express.urlencoded({ extended: true }));


// Définir le dossier des vues et le moteur de template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dossier public pour CSS / JS / images
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", mainRoutes);
app.use("/projets", projetsRoutes);
app.use("/contact", contactRoutes);
app.use('/messages', messageRoutes);
app.use('/notes', notesRoutes);
app.use('/reservations', reservationsRoutes);


// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error("🔥 ERREUR serveur :", err.stack);
    res.status(500).send("⚠️ Erreur interne du serveur.");
  });

// Lancement serveur
app.listen(PORT, () => {
                            console.log(`🚀 Serveur lancé : http://localhost:${PORT}`);
                        });



console.log("📂 Vues :", path.join(__dirname, "views"));
console.log("📂 Public :", path.join(__dirname, "public"));