// importer le framework express
const express = require("express");

// importer le middleware d'authentification
const auth = require("../middleware/auth");

// importer le middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer");

// importer le user depuis le controller
const sauceCtrl = require("../controllers/sauce");

// importer le like depuis le controller
const likeCtrl = require("../controllers/like");



// Utiliser la fonction Router()
const router = express.Router();

// les routes:
// La route POST pour creer une data user
router.post("/", auth, multer, sauceCtrl.createSauce);

// La route GET pour afficher tous les objets qui se trouvent dans la data du user 
router.get("/", auth, sauceCtrl.readAllSauce);

// La route GET pour afficher un des objet grace a son identifiant(id)
router.get("/:id", auth, sauceCtrl.readOneSauce);

// La route PUT pour modifier un objet selectionne grace a son identifiant(_id)
router.put("/:id", auth, multer, sauceCtrl.updateOneSauce);

// La route DELETE pour supprimer un objet selectionne grace a son identifiant(_id)
router.delete("/:id", auth, sauceCtrl.deleteOneSauce);

router.post("/:id/like", auth, likeCtrl.likeSauce);

// exporter du module du router
module.exports = router;