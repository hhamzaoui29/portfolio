const notesModel = require("../models/notesModel");

// afficher toutes les notes
async function listNotes(req, res) {
                                        try {
                                                const notes = await notesModel.getAllNotes();
                                                console.log ("liste des note", notes);
                                                res.render("notes/listNotes", { notes }); 
                                            } catch (err) {
                                                            console.error(err);
                                                            res.status(500).send("Erreur lors du chargement des notes : " + err.message);
                                                          }
                                    }

// formulaire création
function formCreateNote(req, res) {
                                      console.log ("je suis dans formCreateNote");
                                    res.render("notes/formCreateNote"); 
                                  }



// créer une nouvelle note
async function renderCreateNote(req, res) {
                                              const { titre, contenu } = req.body;

                                              if (!titre || !contenu) {
                                                  return res.status(400).send("Tous les champs sont obligatoires !");
                                              }
                                              try {
                                                      await notesModel.createNote({titre, contenu});
                                                      const notes = await notesModel.getAllNotes();
                                                      res.render("notes/listNotes", { 
                                                                                      notes,
                                                                                      success:"La note a bien été créer" 
                                                                                    }); 
                                                  } catch (err) {
                                                                    console.error(err);
                                                                    res.status(500).send("Erreur lors de l’ajout : " + err.message);
                                                                }
                                          }

// afficher une note spécifique
async function formShowNote(req, res) {
                                                  try {
                                                          const note = await notesModel.getNoteById(req.params.id);
                                                          console.log("Je suis dans formShowNote", note);
                                                          if (!note) return res.status(404).send("Note non trouvée");
                                                          res.render("notes/formShowNote", { note }); 
                                                      } catch (err) {
                                                                        res.status(500).send("Erreur : " + err.message);
                                                                    }
                                              }


// formulaire édition
async function formUpdateNote(req, res) {
                                            
                                          try {
                                                  const note = await notesModel.getNoteById(req.params.id); // ✅ Utilise getNoteById
                                                  if (!note) return res.status(404).send("Note non trouvée");
                                                  res.render("notes/formUpdateNote", { note });
                                              } catch (err) {
                                                              console.error(err);
                                                              res.status(500).send("Erreur : " + err.message);
                                                            }
                                        }

// modifier une note
async function renderUpdateNote(req, res) {
                                            try {
                                                    await notesModel.updateNote(req.params.id, req.body);
                                                    const notes = await notesModel.getAllNotes();
                                                    res.render("notes/listNotes", { 
                                                                                      notes,
                                                                                      success:"La note a bien été Modifier" 
                                                                                    }); 
                                                  } catch (err) {
                                                                  res.status(500).send("Erreur lors de la modification : " + err.message);
                                                                }
                                          }

// supprimer une note
async function deleteNote(req, res) {
                                      const id = req.params.id;
                                      try {
                                            await notesModel.deleteNote(id);
                                            const notes = await notesModel.getAllNotes();
                                            res.render("notes/listNotes", { 
                                                                                      notes,
                                                                                      success:"La note a bien été Supprimer" 
                                                                                    }); 
                                          } catch (err) {
                                                          console.error(err);
                                                          res.status(500).send("Erreur lors de la suppression : " + err.message);
                                                        }
                                    }

module.exports = {
                    listNotes,
                    formShowNote,

                    formCreateNote,
                    renderCreateNote,

                    formUpdateNote,
                    renderUpdateNote,

                    deleteNote
                 };
