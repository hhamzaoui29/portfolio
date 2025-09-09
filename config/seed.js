const {db} = require("./db");

// Nettoyer la table avant d'insérer (pour éviter doublons)
db.exec("DELETE FROM projets");

// Préparer l'insertion
const insert = db.prepare(`
                            INSERT INTO projets (titre, description, slug, lien  )
                            VALUES (?, ?, ?, ?)
                        `);

// Quelques projets de test
insert.run(
                "Formulaire de contact",
                "Une mini-application permettant d’envoyer et gérer des messages.",
                "messages",
                ""
          );

insert.run(
                "Bloc-notes",
                "Une application CRUD simple pour gérer ses notes.",
                "notes",
                ""
           );

insert.run(
                "Mini-réservations",
                "Application de gestion de rendez-vous pour un artisan.",
                "reservations",
                ""
          );



console.log("✅ Données insérées avec succès !");

