// importer mongoose
const mongoose = require("mongoose");

// creer les donnees utilisateurs pour la page du frontend
const Schema = mongoose.Schema({
    userId: { type: String, required: true},
    nom: { 
        type: String,
        minlength: [2, "Name is too short"],
        maxlength: 10, 
        required: true},
    prenom: { type: String, required: true},
    age: { type: Number, required: true},
    imageUrl: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

// exporter du module
module.exports = mongoose.model("data_user", Schema);