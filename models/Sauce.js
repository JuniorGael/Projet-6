// importer mongoose
const mongoose = require("mongoose");

// creer les donnees de la sauce pour la page du frontend
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    heat: { type: Number, required: true},
    imageUrl: {type: String, required: true},
    likes: {type: Number, default: 0, required: false},
    dislikes: {type: Number, default: 0, required: false},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false}
});

// exporter du module
// module.exports = mongoose.model("data_user", Schema);
module.exports = mongoose.model("Sauce", sauceSchema);