const Database = require("better-sqlite3");






// Connexion (crée le fichier si non existant)
const db = new Database("vitrine.db");

// Création des tables si elles n'existent pas déjà
db.exec(`
            CREATE TABLE IF NOT EXISTS projets (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    titre TEXT NOT NULL,
                                                    description TEXT NOT NULL,
                                                    slug TEXT,
                                                    lien TEXT
                                                );
        
            CREATE TABLE IF NOT EXISTS messages (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    titre TEXT NOT NULL,
                                                    nom TEXT NOT NULL,
                                                    email TEXT NOT NULL,
                                                    message TEXT NOT NULL,
                                                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                                );
            CREATE TABLE IF NOT EXISTS notes (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    titre TEXT NOT NULL,
                                                    contenu TEXT NOT NULL,
                                                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                                );
            CREATE TABLE IF NOT EXISTS reservations (
                                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                        nom TEXT NOT NULL,
                                                        email TEXT NOT NULL,
                                                        telephone TEXT,
                                                        date TEXT NOT NULL,   -- date de réservation (format texte ISO)
                                                        heure TEXT NOT NULL,  -- heure de réservation
                                                        service TEXT NOT NULL,
                                                        statut TEXT DEFAULT 'en attente',
                                                        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
                                                    );

        `);


        
  module.exports = { 
                        db
                    };
