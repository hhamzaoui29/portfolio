// models/contactModel.js
const db = require("../config/db");

/**
 * Ajouter un message
 * @param {Object} message { nom, email, message }
 * @returns {Object} le message inséré avec id
 */
function createMessage(message) {
                                const req = db.prepare( "INSERT INTO messages (nom, email, message) VALUES (?, ?, ?)" );
                                const data = req.run(message.nom, message.email, message.message);
                                return getMessageById(data.lastInsertRowid);
                             }

/**
 * Récupérer tous les messages
 * @returns {Array<Object>}
 */
function getAllMessages() {
                            const req = db.prepare( "SELECT id, nom, email, message, date FROM messages ORDER BY date DESC" );
                            return req.all();
                          }

/**
 * Récupérer un message par id
 * @param {number|string} id
 * @returns {Object|undefined}
 */
function getMessageById(id) {
                                const req = db.prepare( "SELECT id, nom, email, message, date FROM messages WHERE id = ?" );
                                return req.get(id);
                            }

module.exports = {
                    createMessage,
                    getAllMessages,
                    getMessageById,
                 };
