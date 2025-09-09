// models/NoteModel.js
const { db } = require('../config/db');


function getAllNotes() {
                            const req = db.prepare("SELECT * FROM notes ORDER BY date DESC");
                            return req.all(); // retourne un tableau de Notes
                        }


function getNoteById(id) {
                              const req = db.prepare("SELECT * FROM notes WHERE id = ?");
                              return req.get(id); // retourne un objet ou undefined
                           }
                        

function createNote(note) {
                                                        try {
                                                            const req = db.prepare( "INSERT INTO notes (titre, contenu, date) VALUES (?, ?, ?)" );
                                                            const date = new Date().toLocaleString('fr-FR');
                                                            const data = req.run(note.titre, note.contenu, date);
                                                            
                                                            // Retourner l'objet créé avec son ID
                                                            return {
                                                                        id: data.lastInsertRowid,
                                                                        titre,
                                                                        contenu,
                                                                        date
                                                                    };
                                                        } catch (error) {
                                                            
                                                        }
                                                    }
function updateNote(id, newData) {
                                        try {
                                            const req = db.prepare( "UPDATE notes SET titre = ?, contenu = ?, date = ? WHERE id = ?" );
                                            const date = new Date().toLocaleString('fr-FR');
                                            const data = req.run(newData.titre, newData.contenu, date, id);
                                            console.log(" data dans update == ", data);
                                        
                                            if (data.changes === 0) throw new Error("Note non trouvé");
                                        
                                            return {
                                                id,
                                                titre: newData.titre,
                                                contenu: newData.contenu,
                                                date
                                            };
                                        } catch (error) {
                                            throw error;
                                        }
                                    }

function deleteNote(id) {
                                try {
                                        const req = db.prepare("DELETE FROM notes WHERE id = ?");
                                        const data = req.run(id);
                                    
                                        if (data.changes === 0) throw new Error("Note non trouvé");
                                    
                                        return true; 
                                } catch (error) {
                                    
                                }
                            }
                                    
                        
module.exports = {
                    getAllNotes,
                    getNoteById,

                    createNote,
                    updateNote,

                    deleteNote
                };