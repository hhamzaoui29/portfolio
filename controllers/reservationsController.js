const reservationsModel = require("../models/reservationsModel");

// afficher toutes les Reservations
async function listReservations(req, res) {
                                        try {
                                                const reservations = await reservationsModel.getAllReservations();
                                                console.log ("liste des Reservation", reservations);
                                                res.render("reservations/listReservations", { reservations }); 
                                            } catch (err) {
                                                            console.error(err);
                                                            res.status(500).send("Erreur lors du chargement des Reservations : " + err.message);
                                                          }
                                    }

// formulaire création
function formCreateReservation(req, res) {
                                      console.log ("je suis dans formCreateReservation");
                                    res.render("reservations/formCreateReservation"); 
                                  }



// créer une nouvelle Reservation
async function renderCreateReservation(req, res) {
                                                    const { nom, email, telephone, date, heure, service } = req.body;

                                                    
                                                    try {
                                                            if (!nom || !email || !telephone || !date || !heure || !service ) {
                                                                return res.status(400).send("Tous les champs sont obligatoires !");
                                                            }
                                                            
                                                            // Vérifier format email
                                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                            if (!emailRegex.test(email)) {
                                                              return res.status(400).send("⚠️ Email invalide !");
                                                            }

                                                            // Vérifier que la date n’est pas dans le passé
                                                            const now = new Date();
                                                            const reservationDate = new Date(`${date}T${heure}`);
                                                            if (reservationDate < now) {
                                                              return res.status(400).send("⚠️ Impossible de réserver dans le passé !");
                                                            }

                                                            // 3) doublon (même date + heure + service) -> ATTENTION: await ici
                                                            const all = await reservationsModel.getAllReservations(); // <-- await
                                                            const existing = all.find(r => r.date === date && r.heure === heure && r.service === service);
                                                            if (existing) {
                                                              return res.status(400).send("⚠️ Ce créneau est déjà réservé !");
                                                            }
                                                            await reservationsModel.createReservation({nom, email, telephone, date, heure, service });
                                                            const reservations = await reservationsModel.getAllReservations();
                                                            res.render("reservations/listReservations", { 
                                                                                            reservations,
                                                                                            success:"La Reservation a bien été créer" 
                                                                                          }); 
                                                        } catch (err) {
                                                                          console.error(err);
                                                                          res.status(500).send("Erreur lors de l’ajout : " + err.message);
                                                                      }
                                                }

// afficher une Reservation spécifique
async function formShowReservation(req, res) {
                                                  try {
                                                          const reservation = await reservationsModel.getReservationById(req.params.id);
                                                          console.log("Je suis dans formShowReservation", reservation);
                                                          if (!reservation) return res.status(404).send("Reservation non trouvée");
                                                          res.render("reservations/formShowReservation", { reservation }); // vue "show.ejs"
                                                      } catch (err) {
                                                                        res.status(500).send("Erreur : " + err.message);
                                                                    }
                                              }


// formulaire édition
async function formUpdateReservation(req, res) {
                                            
                                          try {
                                                  const reservation = await reservationsModel.getReservationById(req.params.id); // ✅ Utilise getReservationById
                                                  if (!reservation) return res.status(404).send("reservation non trouvée");
                                                  res.render("reservations/formUpdateReservation", { reservation });
                                              } catch (err) {
                                                              console.error(err);
                                                              res.status(500).send("Erreur : " + err.message);
                                                            }
                                        }

// modifier une Reservation
async function renderUpdateReservation(req, res) {
                                            const { id } = req.params;
                                            const { nom, email, telephone, date, heure, service } = req.body;

                                            // 1) validations basiques
                                            if (!nom || !email || !telephone || !date || !heure || !service) {
                                              return res.status(400).send("⚠️ Tous les champs sont obligatoires !");
                                            }

                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            if (!emailRegex.test(email)) {
                                              return res.status(400).send("⚠️ Email invalide !");
                                            }

                                            // 2) date/heure non passées
                                            const now = new Date();
                                            const reservationDate = new Date(`${date}T${heure}`);
                                            if (reservationDate < now) {
                                              return res.status(400).send("⚠️ Impossible de réserver dans le passé !");
                                            }

                                            // 3) doublon (même date + heure + service, mais ≠ id courant)
                                            const all = await reservationsModel.getAllReservations();
                                            const conflict = all.find(r =>
                                              r.date === date &&
                                              r.heure === heure &&
                                              r.service === service &&
                                              r.id !== id // on ignore la réservation en cours d’édition
                                            );

                                            if (conflict) {
                                              return res.status(400).send("⚠️ Ce créneau est déjà réservé par une autre réservation !");
                                            }

                                            // 4) mise à jour
                                            await reservationsModel.updateReservation(id, { nom, email, telephone, date, heure, service });
                                            return res.redirect("/reservations");
                                          }

// supprimer une Reservation
async function deleteReservation(req, res) {
                                      const id = req.params.id;
                                      try {
                                            await reservationsModel.deleteReservation(id);
                                            const reservations = await reservationsModel.getAllReservations();
                                            res.render("reservations/listReservations", { 
                                                                                      reservations,
                                                                                      success:"La Reservation a bien été Supprimer" 
                                                                                    }); 
                                          } catch (err) {
                                                          console.error(err);
                                                          res.status(500).send("Erreur lors de la suppression : " + err.message);
                                                        }
                                    }

module.exports = {
                    listReservations,
                    formShowReservation,

                    formCreateReservation,
                    renderCreateReservation,

                    formUpdateReservation,
                    renderUpdateReservation,

                    deleteReservation
                 };
