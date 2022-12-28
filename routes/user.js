// importer le framework express
const express = require("express");

// importer le middleware(password)
const password = require("../middleware/password");

// importer le user depuis le controller
const userCtrl = require("../controllers/user");

// Utiliser la fonction Router()
const router = express.Router();

// creer une route signup
router.post("/signup", password, userCtrl.signup);

// creer une route login
router.post("/login", userCtrl.login);

// exporter du module du router
module.exports = router;