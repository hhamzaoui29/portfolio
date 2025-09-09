// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// afficher tous les messages
router.get('/', messageController.listMessages);

// afficher le formulaire (page d'accueil)
router.get('/formCreateMessage', messageController.formCreateMessage);

// afficher formulaire pré-rempli pour modifier
router.get('/formUpdateMessage/:id', messageController.formUpdateMessage);



// Route paramétrée en DERNIER
router.get("/showMessage/:id", messageController.formShowMessage); 


// soumettre un message (formulaire POST)
router.post('/createMessage', messageController.renderCreateMessage);

// enregistrer modification
router.post('/updateMessage/:id', messageController.renderUpdateMessage);

// supprimer un message
router.post('/deleteMessage/:id', messageController.deleteMessage);


module.exports = router;
