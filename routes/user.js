// importer express
const express = require("express");

// importer le user depuis le controller
const userController = require("../controllers/user");

// Utiliser la fonction Router()
const router = express.Router();

// utiliser la route signup
router.post("/signup", userController.signup);

// exporter du module du router
module.exports = router;