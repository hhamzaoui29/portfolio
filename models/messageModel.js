// models/messageModel.js
const { db } = require('../config/db');


function getAllMessages() {
                                const req = db.prepare("SELECT * FROM messages ORDER BY date DESC");
                                return req.all(); // retourne un tableau de messages
                          }


function getMessageById(id) {
                              const req = db.prepare("SELECT * FROM messages WHERE id = ?");
                              return req.get(id); // retourne un objet ou undefined
                           }
                        

function createMessage(titre, nom, email, message) {
                                                        try {
                                                            const req = db.prepare( "INSERT INTO messages (titre, nom, email, message, date) VALUES (?, ?, ?, ?, ?)" );
                                                            const date = new Date().toLocaleString('fr-FR');
                                                            const data = req.run(titre, nom, email, message, date);
                                                            
                                                            // Retourner l'objet créé avec son ID
                                                            return {
                                                                        id: data.lastInsertRowid,
                                                                        titre,
                                                                        nom,
                                                                        email,
                                                                        message,
                                                                        date
                                                                    };
                                                        } catch (error) {
                                                            
                                                        }
                                                    }
function updateMessage(id, newData) {
                                        try {
                                            const req = db.prepare(
                                                "UPDATE messages SET titre = ?, nom = ?, email = ?, message = ?, date = ? WHERE id = ?"
                                            );
                                            const date = new Date().toLocaleString('fr-FR');
                                            const data = req.run(newData.titre, newData.nom, newData.email, newData.message, date, id);
                                        
                                            if (data.changes === 0) throw new Error("Message non trouvé");
                                        
                                            return {
                                                id,
                                                titre: newData.titre,
                                                nom: newData.nom,
                                                email: newData.email,
                                                message: newData.message,
                                                date
                                            };
                                        } catch (error) {
                                            
                                        }
                                    }

function deleteMessage(id) {
                                try {
                                        const req = db.prepare("DELETE FROM messages WHERE id = ?");
                                        const data = req.run(id);
                                    
                                        if (data.changes === 0) throw new Error("Message non trouvé");
                                    
                                        return true; 
                                } catch (error) {
                                    
                                }
                            }
                                    
                        
module.exports = {
                    getAllMessages,
                    createMessage,
                    getMessageById,
                    updateMessage,
                    deleteMessage
                };
                            