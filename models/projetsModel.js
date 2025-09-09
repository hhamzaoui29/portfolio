// models/projetsModel.js
// Modèle pour la table "projets" (SQLite via better-sqlite3)

const {db} = require('../config/db');

/**
 * Récupérer tous les projets (ordre décroissant par id)
 * @returns {Array<Object>}
 */
function getAllProjects() {
                            const req = db.prepare('SELECT id, titre, description, slug FROM projets ORDER BY id DESC');
                            return req.all(); // .all() retourne un tableau de lignes
                          }

/**
 * Récupérer un projet par son id
 * @param {number|string} id
 * @returns {Object|undefined}
 */
function getProjectById(id) {
                                const req = db.prepare('SELECT id, titre, description,slug, lien FROM projets WHERE id = ?');
                                return req.get(id); // .get() retourne une seule ligne ou undefined
                            }

/**
 * Récupérer un projet par slug
 * @param {string} slug
 * @returns {object|null} Projet trouvé ou null si inexistant
 */
function getProjectBySlug(slug) {
                                    const req = db.prepare("SELECT * FROM projets WHERE slug = ?");
                                    return req.get(slug); // retourne un objet ou undefined si non trouvé
                                }

/**
 * Ajouter un nouveau projet
 * @param {Object} project  { titre, description }
 * @returns {Object} le projet inséré (avec id)
 */
function createProject(project) {
                                    const req = db.prepare(' INSERT INTO projets (titre, description, slug, lien) VALUES (?, ?, ?, ?)');
                                    const data = req.run(project.titre, project.description, project.slug, project.lien);
                                    // data.lastInsertRowid contient l'id généré par AUTOINCREMENT
                                    return getProjectById(data.lastInsertRowid);
                                }

/**
 * Mettre à jour un projet existant
 * @param {number|string} id
 * @param {Object} newData { titre, description }
 * @returns {Object} le projet mis à jour
 */
function updateProject(id, newData) {
                                        const req = db.prepare('UPDATE projets SET titre = ?, description = ?, slug = ?, lien = ?  WHERE id = ?');
                                        const data = req.run(newData.titre, newData.description, newData.slug, newData.lien, id);
                                        if (data.changes === 0) {
                                                                    // aucune ligne modifiée => id introuvable
                                                                    throw new Error('Projet non trouvé');
                                                                }
                                        return getProjectById(id);
                                    }

/**
 * Supprimer un projet par id
 * @param {number|string} id
 * @returns {boolean} true si supprimé, false sinon
 */
function deleteProject(id) {
                                const req = db.prepare('DELETE FROM projets WHERE id = ?');
                                const data = req.run(id);
                                return data.changes > 0;
                            }

module.exports = {
                    getAllProjects,
                    getProjectById,
                    getProjectBySlug,

                    createProject,
                    updateProject,

                    deleteProject
                 };
