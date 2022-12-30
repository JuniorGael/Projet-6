// importer le framework express
const express = require("express");

// importer le user depuis le controller
const dataUserCtrl = require("../controllers/dataUser");

// importer le like depuis le controller
const likeCtrl = require("../controllers/like");

// importer le middleware d'authentification
const auth = require("../middleware/auth");

// importer le middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer");

// Utiliser la fonction Router()
const router = express.Router();

// les routes:
// La route POST pour creer une data user
router.post("/", auth, multer, dataUserCtrl.createDataUser);

// La route GET pour afficher tous les objets qui se trouvent dans la data du user 
router.get("/", auth, dataUserCtrl.readAllDataUser);

// La route GET pour afficher un des objet grace a son identifiant(id)
router.get("/:id", auth, dataUserCtrl.readOneDataUser);

// La route PUT pour modifier un objet selectionne grace a son identifiant(_id)
router.put("/:id", auth, multer, dataUserCtrl.updateOneDataUser);

// La route DELETE pour supprimer un objet selectionne grace a son identifiant(_id)
router.delete("/:id", auth, dataUserCtrl.deleteOneDataUser);

router.post("/:id/like", auth, likeCtrl.likeDataUser);

// exporter du module du router
module.exports = router;