const contactModel = require("../models/contactModel");

/**
 * Afficher formulaire de contact
 */
function formContact(req, res) {
                                    res.render("contact");
                               }

/**
 * Recevoir et enregistrer un message
 */
function sendMessage(req, res) {
                                    try {
                                            const { nom, email, message } = req.body;

                                            // Validation simple
                                            if (!nom || !email || !message) {
                                                                              return res.status(400).send("Tous les champs sont obligatoires.");
                                                                            }

                                            contactModel.addMessage({ nom, email, message });
                                            res.render("contact", { success: "Message envoyé avec succès !" });
                                        } catch (err) {
                                                            console.error(err);
                                                            res.status(500).send("Erreur serveur lors de l'envoi du message.");
                                                       }
                                }

module.exports = {
                    formContact,
                    sendMessage,
                 };
