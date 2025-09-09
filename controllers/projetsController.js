// controllers/projetsController.js
// Contrôleur pour gérer les projets

const projetsModel = require("../models/projetsModel");

/**
 * Afficher tous les projets (liste)
 */
async function listProjects(req, res) {
                                  try {
                                        // Vérifier et créer les mini-projets si absents
                                        const miniProjets = [
                                                              { titre: "messages",  slug: "messages", description: "Mini-application de formulaire simple" },
                                                              { titre: "notes",  slug: "notes", description: "Mini-application de bloc-notes" },
                                                              { titre: "réservation", slug: "reservations", description: "Mini-application de réservation de rendez-vous" }
                                                            ];

                                        for (const p of miniProjets) {
                                                                        const existing = await projetsModel.getProjectBySlug(p.slug);
                                                                        if (!existing) {
                                                                                          await projetsModel.createProject(p);
                                                                                        }
                                                                      }

                                        // Récupérer tous les projets
                                        const projets = await projetsModel.getAllProjects();
                                        res.render("projets", { projets });
                                        
                                      } catch (err) {
                                                      console.error(err);
                                                      res.status(500).send("Erreur serveur lors du chargement des projets.");
                                                    }
                                }

/**
 * Afficher un projet spécifique (détail)
 */
function showProject(req, res) {
                                    try {
                                                const id = req.params.id;
                                                const projet = projetsModel.getProjectById(id);
                                                if (!projet) {
                                                                return res.status(404).send("Projet non trouvé");
                                                             }
                                                res.render("projetDetail", { 
                                                                                projet 
                                                                            });

                                            } catch (err) {
                                                            console.error(err);
                                                            res.status(500).send("Erreur serveur");
                                                          }
                                }

/**
 * Afficher formulaire de création d'un projet
 */
function formCreateProject(req, res) {
                                        res.render("createProject");
                                     }

/**
 * Recevoir et créer un projet
 */
function createProject(req, res) {
                                    try {
                                            const { titre, description, lien } = req.body;

                                            // Validation simple
                                            if (!titre || !description) {
                                                                            return res.status(400).send("Titre et description obligatoires");
                                                                        }

                                            projetsModel.addProject({ titre, description, lien });
                                            res.redirect("/projets");

                                        } catch (err) {
                                                        console.error(err);
                                                        res.status(500).send("Erreur serveur lors de la création");
                                                      }
                                 }

/**
 * Afficher formulaire d'édition
 */
function formUpdateProject(req, res) {
                                        try {
                                                const id = req.params.id;
                                                const projet = projetsModel.getProjectById(id);
                                                if (!projet) {
                                                                return res.status(404).send("Projet non trouvé");
                                                             }
                                                res.render("editProject", { 
                                                                                projet
                                                                          });

                                            } catch (err) {
                                                                console.error(err);
                                                                res.status(500).send("Erreur serveur");
                                                           }
                                     }

/**
 * Recevoir et mettre à jour un projet
 */
function updateProject(req, res) {
                                    try {
                                            const id = req.params.id;
                                            const { titre, description, lien } = req.body;

                                            if (!titre || !description) {
                                                                            return res.status(400).send("Titre et description obligatoires");
                                                                        }

                                            projetsModel.updateProject(id, { titre, description, lien });
                                            res.redirect("/projets");

                                        } catch (err) {
                                                        console.error(err);
                                                        res.status(500).send("Erreur serveur lors de la mise à jour");
                                                    }
                                  }

/**
 * Supprimer un projet
 */
function deleteProject(req, res) {
                                    try {
                                            const id = req.params.id;
                                            const deleted = projetsModel.deleteProject(id);
                                            if (!deleted) {
                                                            return res.status(404).send("Projet non trouvé");
                                                           }
                                            res.redirect("/projets");
                                            
                                        } catch (err) {
                                                            console.error(err);
                                                            res.status(500).send("Erreur serveur lors de la suppression");
                                                      }
                                 }

module.exports = {
                    listProjects,
                    showProject,

                    formCreateProject,
                    createProject,

                    formUpdateProject,
                    updateProject,
                    
                    deleteProject
                 };
