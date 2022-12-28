// importer mongoose
const mongoose = require("mongoose");

// creer les donnees utilisateurs pour la page du frontend
const Schema = mongoose.Schema({
    userId: { type: String, required: true},
    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    age: { type: Number, required: true},
    imageUrl: {type: String, required: true}
});

// exporter du module
module.exports = mongoose.model("data_user", Schema);