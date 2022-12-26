// importer mongoose
const mongoose = require("mongoose");

// creer le modele de base de donnees pour l'enregistrement d'un nouvel user (signup)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

// exporter du module
module.exports = mongoose.model("user", userSchema);