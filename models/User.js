// importer mongoose
const mongoose = require("mongoose");

// importer mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

// creer le modele de base de donnees pour l'enregistrement d'un nouvel user (signup)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

// creer une securite pour ne pas enregistrer 2 fois le meme email dans la base de donnees
userSchema.plugin(uniqueValidator);

// exporter du module
module.exports = mongoose.model("User", userSchema);