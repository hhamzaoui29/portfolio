// controllers/messageController.js
const MessageModel = require('../models/messageModel');





/**-------------------------- afficher la liste des messages ------------------------------------------------**/
async function listMessages(req, res) {
    try {
            const messages = await MessageModel.getAllMessages();
            // on passe le tableau à la vue "messages.ejs"
            res.render('messages/listMessages', { messages }); 
        } catch (err) {
                            console.error(err);
                            res.status(500).send("Erreur lors de la lecture des messages.");
                       }
}

/** -------------------------  afficher le formulaire de contact -------------------------------------------- **/
function formCreateMessage(req, res) {
                                     // on affichera la vue "contact.ejs"
                                     res.render('messages/formCreateMessage'); 
                                   }


/**-------------------------- enregistrer un message envoyé via le formulaire ------------------------------------------------**/
async function renderCreateMessage(req, res) {
                                        const { titre,nom, email, message } = req.body;

                                        if (!titre || !nom || !email || !message) {
                                            return res.status(400).send("Tous les champs sont obligatoires !");
                                        }

                                        try {
                                            await MessageModel.createMessage(titre, nom, email, message);
                                            const messages = await MessageModel.getAllMessages();
                                            // Au lieu de rediriger, on affiche le formulaire avec un message de confirmation
                                            res.render('messages/listMessages', {  messages,
                                                                                   success: "Votre message a bien été envoyé !" 
                                                                                });
                                        } catch (err) {
                                            console.error(err);
                                            res.status(500).send("Erreur lors de l'enregistrement du message.");
                                        }
                                     }
/** ------------------------- Afficher d'atail d'un message -------------------------------------------------------------------- **/
// afficher un Message spécifique
async function formShowMessage(req, res) {
                                            try {
                                                    const message = await MessageModel.getMessageById(req.params.id);
                                                    console.log("Je suis dans formShowMessage", message);
                                                    if (!message) return res.status(404).send("Message non trouvée");
                                                    res.render("messages/formShowMessage", { message }); 
                                                } catch (err) {
                                                                res.status(500).send("Erreur : " + err.message);
                                                              }
                                        }
/**-------------------------- afficher le formulaire pré-rempli pour modification------------------------------------------------**/ 
async function formUpdateMessage(req, res) {
                                                   const id = req.params.id;
                                                    try {
                                                            const messages = await MessageModel.getAllMessages();
                                                            const message = messages.find(msg => msg.id == id);
                                                            console.log("message = ", message);
                                                            if (!message) return res.status(404).send("Message non trouvé");
                                                        
                                                            res.render('messages/formUpdateMessage', { message, edit: true }); // on réutilise contact.ejs
                                                        } catch (err) {
                                                            console.error(err);
                                                            res.status(500).send("Erreur lors de l'affichage du formulaire de modification.");
                                                        }
                                            }

/**-------------------------- enregistrer la modification------------------------------------------------**/
async function renderUpdateMessage(req, res) {
                                                const id = req.params.id;
                                                const { titre, nom, email, message } = req.body;

                                                if (!titre || !nom || !email || !message) {
                                                    return res.status(400).send("Tous les champs sont obligatoires !");
                                                }

                                                try {
                                                        await MessageModel.updateMessage(id, { titre, nom, email, message });
                                                        res.redirect('/messages');
                                                    } catch (err) {
                                                        console.error(err);
                                                        res.status(500).send("Erreur lors de la modification du message.");
                                                    }
                                             }

/**-------------------------- supprimer un message------------------------------------------------**/
async function deleteMessage(req, res) {
                                            // récupère l'id dans l'URL
                                            const id = req.params.id; 
                                            try {
                                                    await MessageModel.deleteMessage(id);
                                                    // retour à la liste après suppression
                                                    res.redirect('/messages'); 
                                                } catch (err) {
                                                                console.error(err);
                                                                res.status(500).send("Erreur lors de la suppression du message.");
                                                            }
                                        }

/**-------------------------- Module.Exports ------------------------------------------------**/ 
  module.exports = {
      
                        listMessages,

                        formCreateMessage,
                        renderCreateMessage,

                        formShowMessage,

                        formUpdateMessage,
                        renderUpdateMessage,

                        deleteMessage,
                    };


