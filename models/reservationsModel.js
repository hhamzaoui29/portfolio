// models/reservationModel.js
const { db } = require('../config/db');

// récupérer toutes les réservations
async function getAllReservations() {
                                        try {
                                                const req = db.prepare("SELECT * FROM reservations ORDER BY date DESC");
                                                return req.all(); 
                                            } catch (error) {
                                                                console.error("Erreur getAllReservations:", error.message);
                                                                throw error;
                                                            }
                                    }

// récupérer une réservation par ID
async function getReservationById(id) {
                                            try {
                                                const req = db.prepare("SELECT * FROM reservations WHERE id = ?");
                                                return req.get(id); // retourne un objet ou undefined
                                                } catch (error) {
                                                                    console.error("Erreur getReservationsById:", error.message);
                                                                    throw error;
                                                                }
                                      }

// créer une nouvelle réservation
async function createReservation(reservation) {
                                                            try {
                                                                    const req = db.prepare(`
                                                                                                INSERT INTO reservations 
                                                                                                (nom, email, telephone, date, heure, service, statut, createdAt) 
                                                                                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                                                                            `);

                                                                    const createdAt = new Date().toISOString(); // format ISO propre

                                                                    const data = req.run(
                                                                                            reservation.nom,
                                                                                            reservation.email,
                                                                                            reservation.telephone,
                                                                                            reservation.date,
                                                                                            reservation.heure,
                                                                                            reservation.service,
                                                                                            reservation.statut,
                                                                                            createdAt
                                                                                        );

                                                                    // Retourner l'objet créé avec son ID
                                                                    return {
                                                                                id: data.lastInsertRowid,
                                                                                ...reservation,
                                                                                createdAt
                                                                            };

                                                                } catch (error) {
                                                                                    console.error("Erreur createReservation:", error.message);
                                                                                    throw error;
                                                                                }
                                               }

// modifier une réservation existante
async function updateReservation(id, newData) {
                                                    try {
                                                            const req = db.prepare(`
                                                                                        UPDATE reservations 
                                                                                        SET nom = ?, email = ?, telephone = ?, date = ?, heure = ?, service = ?, statut = ?, createdAt = ? 
                                                                                        WHERE id = ?
                                                                                    `);

                                                            const createdAt = new Date().toISOString();

                                                            const data = req.run(
                                                                                    newData.nom,
                                                                                    newData.email,
                                                                                    newData.telephone,
                                                                                    newData.date,
                                                                                    newData.heure,
                                                                                    newData.service,
                                                                                    newData.statut,
                                                                                    createdAt,
                                                                                    id
                                                                                );

                                                            if (data.changes === 0) throw new Error("Réservation non trouvée");

                                                            return {
                                                                        id,
                                                                        ...newData,
                                                                        createdAt
                                                                    };

                                                        } catch (error) {
                                                                            console.error("Erreur updateReservation:", error.message);
                                                                            throw error;
                                                                        }
                                                }

// supprimer une réservation
async function deleteReservation(id) {
                                            try {
                                                    const req = db.prepare("DELETE FROM reservations WHERE id = ?");
                                                    const data = req.run(id);

                                                    if (data.changes === 0) throw new Error("Réservation non trouvée");

                                                    return true;

                                                } catch (error) {
                                                                    console.error("Erreur deleteReservation:", error.message);
                                                                    throw error;
                                                                }
                                     }

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};
