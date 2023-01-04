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
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

// exporter du module
// module.exports = mongoose.model("data_user", Schema);
module.exports = mongoose.model("sauce", sauceSchema);